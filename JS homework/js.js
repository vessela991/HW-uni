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

var successId = "success";

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

function clearValue2(elementId, elementInvalidId) {
    clearValue(elementId);
    document.getElementById(elementInvalidId).innerText = "";
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
            clearValue2(usernameId, usernameInvalidId);
            clearValue2(nameId, nameInvalidId);
            clearValue2(familyNameId, familyNameInvalidId);
            clearValue2(passwordId, passwordInvalidId);
            clearValue2(emailId, emailInvalidId);
            clearValue(streetId);
            clearValue(cityId);
            clearValue2(postalCodeId, postalCodeInvalidId);
        }
    } else {
        if (isUsernameValid && isNameValid && isFamilyNameValid && isPasswordValid && isEmailValid) {
            displaySuccess();
            clearValue2(usernameId, usernameInvalidId);
            clearValue2(nameId, nameInvalidId);
            clearValue2(familyNameId, familyNameInvalidId);
            clearValue2(passwordId, passwordInvalidId);
            clearValue2(emailId, emailInvalidId);
            clearValue(streetId);
            clearValue(cityId);
            clearValue2(postalCodeId, postalCodeInvalidId);
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
        displayError(usernameId, usernameInvalidId, "Невалидно потребителско име.");
        return;
    } 
    let hasDup = await hasDuplicateUsername();
    if (hasDup) {
        isUsernameValid = false;
        displayError(usernameId, usernameInvalidId,"Избраното потребителско име вече съществува.");
        return;
    }
    isUsernameValid = true;
}

function validateName(name) {
    if (name.value.trim().length === 0 || name.value.length > 50) {
        isNameValid = false;
        displayError(nameId, nameInvalidId, "Невалидно име.")
    }
    else {
        isNameValid = true;
    }
}

function validateFamilyName(familyName) {
    if (familyName.value.trim().length === 0 || familyName.value.length > 50) {
        isFamilyNameValid = false;
        displayError(familyNameId, familyNameInvalidId, "Невалидно фамилно име.")
    }
    else {
        isFamilyNameValid = true;
    }
}

function validateEmail(email) {
    if (!emailRegex.test(email.value)) {
        isEmailValid = false;
        displayError(emailId, emailInvalidId, "Невалиден e-mail.")
    } 
    else {
        isEmailValid = true;
    }
}

function validatePassword(password) {
    if (!passwordRegex.test(password.value)) {
        isPasswordValid = false;
        displayError(passwordId, passwordInvalidId, "Невалидна парола.")
    } 
    else {
        isPasswordValid = true;
    }
}

function validatePostalCode(postalCode) {
    if (postalCode.value.trim().length !== 0) {
        if (!postalCodeRegexOnlyNumbers.test(postalCode.value) && !postalCodeRegexNumbersWithDash.test(postalCode.value)) {
            isPostalCodeValid = false;
            displayError(postalCodeId, postalCodeInvalidId, "Невалиден формат на пощенски код.")
        } 
        else {
            isPostalCodeValid = true;
        }
    }
}

function displayError(elementId, elementInvalidId, errorMessage) {
    var paragraph = document.getElementById(elementInvalidId);
    paragraph.style.display='block';
    paragraph.innerText = errorMessage;
    
    var element = document.getElementById(elementId);
    element.classList.add("field-invalid");
    element.classList.remove("field");
}