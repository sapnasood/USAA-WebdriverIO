let chai = require('chai');
global.assert = chai.assert;

describe('USAA Assessment homepage', () => {
    beforeEach(() => {
        browser.url('file:///C:/Users/sapsood/Desktop/Sapna/USSA%20Assessment/index.html');
    })

    it('Get title of USAA Assessment homepage', () => {
        // browser.url('file:///C:/Users/sapsood/Desktop/Sapna/USSA%20Assessment/index.html');
        const title = browser.getTitle();
        console.log('Page Title======= :   ' + title);
        assert.equal(title, 'Java Script API Assessment');
    });

    it('Passing null value to both the input field on the page', () => {
        $('#ctry-name').setValue();
        $('#ctry-code').setValue();
        $('#get-btn').click();
        const header = $('#error-header');
        assert.equal(header.getText(), 'Enter either country name or country code!!');

    });

    it('Pass invalid country name containing only alphabets', () => {
        // browser.url('file:///C:/Users/sapsood/Desktop/Sapna/USSA%20Assessment/index.html');
        const ctryElem = $('#ctry-name');
        ctryElem.setValue('sapna');
        // console.log(ctryElem.getValue());
        $('#get-btn').click();
        const header = $('#error-header');
        // console.log('Error message=======' + header.getText());
        assert.equal(header.getText(), 'Error: Request failed with status code 404');

    });

    it('Pass alphanumeric country name', () => {
        $('#ctry-name').setValue('sap123');
        $('#get-btn').click();
        const header = $('#error-header');
        assert.equal(header.getText(), 'Country Name cannot be alphanumeric');

    });

    it('Pass correct partial or native country name',() =>{
        $('#ctry-name').setValue('unit');
        $('#get-btn').click();
        // browser.debug();
        console.log('Capital Table==========' + $('#cap-table').isExisting());
        const tableElem = $('#cap-table');
        console.log('Table Element ===========' + tableElem);
        tableElem.waitForDisplayed();
        assert.isTrue(tableElem.isExisting());

    });
    it('Pass alphanumeric country code', () => {
        $('#ctry-code').setValue('sap123');
        $('#get-btn').click();
        const header = $('#error-header');
        assert.equal(header.getText(), 'Country code cannot be alphanumeric or more than 3 letters');

    });

    it('Pass country code more than 3 characters', () => {
        $('#ctry-code').setValue('qwert');
        $('#get-btn').click();
        const header = $('#error-header');
        assert.equal(header.getText(), 'Country code cannot be alphanumeric or more than 3 letters');

    });

    it('Pass invalid country code of 3 alphabets', () => {
        $('#ctry-code').setValue('qwe');
        $('#get-btn').click();
        const header = $('#error-header');
        assert.equal(header.getText(), 'Error: Request failed with status code 404');

    });

    it('Pass valid 3 letters country code',() =>{
        $('#ctry-code').setValue('col');
        $('#get-btn').click();
        $('#capital').waitForDisplayed();
        assert.isTrue($('#capital').isExisting()); 

    });

})