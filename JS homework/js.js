var usernameId = "username";
var usernameInvalidId = "usernameInvalid";

var nameId = "name";
var nameInvalidId = "nameInvalid";

var familyNameId = "family-name";
var familyNameInvalidId = "family-nameInvalid";

var emailId = "email";
var emailInvalidId = "emailInvalid";

var passwordId = "password";
var passwordInvalidId = "passwordInvalid";

var postalCodeId = "postal-code";
var postalCodeInvalidId = "postal-codeInvalid";

var streetId = "street";

var cityId = "city";

var postalCodeId = "postal-code";

var successId = "successfulRegistration";

var isUsernameValid = false;
var isNameValid = false;
var isFamilyNameValid = false;
var isPasswordValid = false;
var isEmailValid = false;
var isPostalCodeValid = false;

var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
var emailRegex = /\S+@\S+\.\S+/;
var postalCodeRegexOnlyNumbers = /^(\d*)$/;
var postalCodeRegexNumbersWithDash = /^(\d*\-\d*)$/;


async function handleRegister(){
    await validateUserInput();
}

function removeErrors(elementId, elementInvalidId) {
    let element = document.getElementById(elementId);
    if (element.classList.contains("field-invalid")) {
        element.classList.remove("field-invalid");
        element.classList.add("field");
        document.getElementById(elementInvalidId).style.display='none';
    }
}

function displaySuccess() {
    let element = document.getElementById(successId);
    return element.classList.remove('display-none');
}

function clearValue(elementId) {
    document.getElementById(elementId).value = "";
}

async function validateUserInput() {
    await validateUsername(document.getElementById(usernameId));
    validateName(document.getElementById(nameId));
    validateFamilyName(document.getElementById(familyNameId));
    validatePassword(document.getElementById(passwordId));
    validateEmail(document.getElementById(emailId));
    validatePostalCode(document.getElementById(postalCodeId));

    if (document.getElementById(postalCodeId).value.trim().length !== 0) {
        if (isUsernameValid && isNameValid && isFamilyNameValid && isPasswordValid && isEmailValid && isPostalCodeValid) {
            displaySuccess();
            clearValue(usernameId);
            clearValue(nameId);
            clearValue(familyNameId);
            clearValue(passwordId);
            clearValue(emailId);
            clearValue(streetId);
            clearValue(cityId);
            clearValue(postalCodeId);
        }
    } else {
        if (isUsernameValid && isNameValid && isFamilyNameValid && isPasswordValid && isEmailValid) {
            displaySuccess();
            clearValue(usernameId);
            clearValue(nameId);
            clearValue(familyNameId);
            clearValue(passwordId);
            clearValue(emailId);
            clearValue(streetId);
            clearValue(cityId);
            clearValue(postalCodeId);
        }
    }
    return;
}

async function hasDuplicateUsername() {
    const request = await fetch('https://jsonplaceholder.typicode.com/users', {method: 'GET'});
    const users = await request.json();
    let username = document.getElementById(usernameId).value;

    for (var j = 0; j < users.length; j++) {

        if (users[j].username === username) {
            return true;
        }
    }
    return false;
}

async function validateUsername(username) {
    if (username.value.trim().length === 0 || (username.value.length < 3 || username.value.length > 10)) {
        isUsernameValid = false;
        document.getElementById(usernameInvalidId).innerHTML = "Невалидно потребителско име."
        displayError(usernameId, usernameInvalidId);
        return;
    } 
    let hasDup = await hasDuplicateUsername();
    console.log("hasdup:" + hasDup);
    if (hasDup) {
        isUsernameValid = false;
        console.log("ds:");
        document.getElementById(usernameInvalidId).innerHTML = "Избраното потребителско име вече съществува."
        displayError(usernameId, usernameInvalidId);
        return;
    }
    isUsernameValid = true;
}

function validateName(name) {
    if (name.value.trim().length === 0 || name.value.length > 50) {
        isNameValid = false;
        displayError(nameId, nameInvalidId)
    }
    else {
        isNameValid = true;
    }
}

function validateFamilyName(familyName) {
    if (familyName.value.trim().length === 0 || familyName.value.length > 50) {
        isFamilyNameValid = false;
        displayError(familyNameId, familyNameInvalidId)
    }
    else {
        isFamilyNameValid = true;
    }
}

function validateEmail(email) {
    if (!emailRegex.test(email.value)) {
        isEmailValid = false;
        displayError(emailId, emailInvalidId)
    } 
    else {
        isEmailValid = true;
    }
}

function validatePassword(password) {
    if (!passwordRegex.test(password.value)) {
        isPasswordValid = false;
        displayError(passwordId, passwordInvalidId)
    } 
    else {
        isPasswordValid = true;
    }
}

function validatePostalCode(postalCode) {
    if (postalCode.value.trim().length !== 0) {
        if (!postalCodeRegexOnlyNumbers.test(postalCode.value) && !postalCodeRegexNumbersWithDash.test(postalCode.value)) {
        isPostalCodeValid = false;
        displayError(postalCodeId, postalCodeInvalidId)
        } 
        else {
        isPostalCodeValid = true;
        }
    }
}

function displayError(elementId, elementInvalidId) {
    document.getElementById(elementInvalidId).style.display='block';
    var element = document.getElementById(elementId);
    element.classList.add("field-invalid");
    element.classList.remove("field");
}