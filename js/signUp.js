const form = document.getElementById("form");

const nameInput = document.getElementById("name");
// const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
// const websiteInput = document.getElementById("website");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const password1Error = document.getElementById("password1-error");
const password2Error = document.getElementById("password2-error");

let isValid = false;
let passwordsMatch = false;

function showMessage(msg, message) {
    message.textContent = msg;
    // message.style.color = "red";
    // messageContainer.style.borderColor = isSuccess ? "green" : "red";
}

function validateForm() {
    isValid = true;

    // Name validation
    if (nameInput.value.length < 3 || nameInput.value.length > 100) {
        showMessage("Name must be between 3 and 100 characters.", nameError);
        return false;
    }

    if (isEmailRegistered(emailInput.value)) {
        showMessage("Email already registered. Please login.", emailError);
        console.log(emailInput.value);
        return false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        showMessage("Invalid email address.", emailError);
        return false;
    }

    // Password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password1El.value)) {
        showMessage(
            "Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, and 1 number.",
            password1Error
        );
        return false;
    }

    // Check if passwords match
    if (password1El.value === password2El.value) {
        passwordsMatch = true;
        password1El.style.borderColor = "green";
        password2El.style.borderColor = "green";
    } else {
        passwordsMatch = false;
        showMessage("Passwords do not match!", password2Error);
        password1El.style.borderColor = "red";
        password2El.style.borderColor = "red";
        return false;
    }

    // showMessage("Successfully Registered!", true);
    return true;
}

function saveToLocalStorage() {
    const users = getUsers();
    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: password1El.value.trim(),
    };

    if (users.some((user) => user.email === userData.email)) {
        showMessage("Email already registered. Please login.", emailError);
        return false;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
    const users = JSON.parse(localStorage.getItem("users"));
    return users ? users : [];
}

function isEmailRegistered(email) {
    const existingUser = JSON.parse(localStorage.getItem("userData"));
    return existingUser && existingUser.email === email;
}

function processFormData(e) {
    console.log(e);
    e.preventDefault();
    nameError.textContent = "";
    emailError.textContent = "";
    password1Error.textContent = "";
    password2Error.textContent = "";
    if (validateForm()) {
        saveToLocalStorage();
        form.reset();
    }
}

form.addEventListener("submit", processFormData);
