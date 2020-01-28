// Get HTML elements by id attribute
const app = document.getElementById('root');
const getBtn = document.getElementById('get-btn');
const getName = document.getElementById('ctry-name');
const getCode = document.getElementById('ctry-code');

const cntryCodeHeader = document.createElement('h1');
cntryCodeHeader.id = "code-h1";
const getcntryCodeHeader = document.getElementById('code-h1');

const continueBtn = document.createElement('button');
var getcontinueBtn;
continueBtn.id = "continue-btn";
continueBtn.textContent = "Continue Search";


const exitBtn = document.createElement('button');
var getexitBtn;
exitBtn.id = "exit-btn";
exitBtn.innerText = "Exit";


const container = document.createElement('div');
container.id = 'cont';

app.append(container);

//This function is triggered when Get Data button is clicked and it makes a GET api call
// to fetch Capital from country name or country code given by the user
const getData = () => {
    var expression = /^[a-zA-Z]+$/;

    // Alert is thrown if user doesn't provide both country name and code
    if (!(getCode.value) && !(getName.value)) {
        // Invoke errorMessage function to display error message
        errorMessage('Enter either country name or country code!!');

    }

    //  Axios Get call to the web service when country native or partial name is given by the user   
    if (getName.value) {
        if (getName.value.match(expression)) {
            axios.get('https://restcountries.eu/rest/v2/name/' + `${getName.value}`)
                .then((response) => {
                    console.log('Country native or partial name  : ' + getName.value);
                 //  Create a table
                    const capitalTable = document.createElement('table');
                    capitalTable.id = 'cap-table';
                    container.append(capitalTable);

                   const getTable = document.getElementById('cap-table');
 
                    response.data.forEach(element => {
                         let i ;
                         console.log("Country====> :" + element.name + "   " + "Capital===>  : " + element.capital);
                         var row = getTable.insertRow(i++);
                         var cell1 = row.insertCell(0);
                         var cell2 = row.insertCell(1);
                         cell1.innerHTML = element.name;
                         cell2.innerHTML = element.capital;    

                    });

                    var header = getTable.createTHead();
                    var row = header.insertRow(0);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = '<b>Country Name </b>';
                    cell2.innerHTML = '<b> Capital City </b>';   
    // Continue search function
    contSearch();


                })
                .catch((error) => {
                    console.log(error);
                    errorMessage(error);
                })
                .finally(() => {
                    // always executed
                })
        }
        else {
            errorMessage('Country Name cannot be alphanumeric');
        }
    }


    // Axios Get call to the web service when country code is given by the user
    if (getCode.value) {
        if (getCode.value.match(expression) && getCode.value.length <= 3) {


            axios.get('https://restcountries.eu/rest/v2/alpha/' + `${getCode.value}`)
                .then((response) => {
                    console.log("Country code  : " + getCode.value)

                    cntryCodeHeader.innerHTML = "Country code  : " + getCode.value;
                    container.appendChild(cntryCodeHeader);

                    console.log(response.data.capital);

                    const capital = document.createElement('h2');
                    capital.id = 'capital';
                    capital.innerHTML = "Capital :: " + response.data.capital;
                    container.appendChild(capital);
                    // Hide Search options
                    hideSelectOption();
                    contSearch();


                })
                .catch((error) => {
                    console.log(error);
                    errorMessage(error);
                })
                .finally(() => {
                    // always executed
                })
        }
        else {
            errorMessage('Country code cannot be alphanumeric or more than 3 letters');

        }
    }

}

const continueSrc = () => {
    getBtn.style.visibility = "visible";
    getCode.value = "";
    getName.value = "";
    getcontinueBtn.style.visibility = "hidden";
    getexitBtn.style.visibility = "hidden";
    const getContainer = document.getElementById('cont');
    getContainer.innerHTML = "";
    showSelectOption();


}

const closeApp = () => {
    javascript: window.close('', '_parent', '');

}

// Click event on Get Data button
getBtn.addEventListener('click', getData);

contSearch = () => {

    container.appendChild(continueBtn);
    container.appendChild(exitBtn);
    getcontinueBtn = document.getElementById('continue-btn');
    getcontinueBtn.style.visibility = "visible";
    getexitBtn = document.getElementById('exit-btn');
    getexitBtn.style.visibility = "visible";

    // Click event on Continue Search button
    getcontinueBtn.addEventListener('click', continueSrc);

    // Click Exit button to close the app
    getexitBtn.addEventListener('click', closeApp);



}

hideSelectOption = () => {
    getBtn.style.visibility = "hidden";
    getName.style.visibility = "hidden";
    getCode.style.visibility = "hidden";
}

showSelectOption = () => {
    getBtn.style.visibility = "visible";
    getName.style.visibility = "visible";
    getCode.style.visibility = "visible";
}

errorMessage = (errmsg) => {
    const errheader = document.createElement('h1');
    errheader.id = 'error-header';
    errheader.innerText = errmsg;
    container.appendChild(errheader);
    // Continue search function
    contSearch();
    // Hide Search options
    hideSelectOption();
}