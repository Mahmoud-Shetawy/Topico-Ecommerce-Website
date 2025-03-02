const loginForm = document.getElementById("loginForm");
const emailInput_log = document.getElementById("email-log");
const passwordInput_log = document.getElementById("password-log");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

function showMessage(msg, message) {
    message.textContent = msg;
}

function processLogin(e) {
    emailError.textContent = "";
    passwordError.textContent = "";
    e.preventDefault();
    if (validateForm()) {
        window.location.href = "index.html";
    }
    loginForm.reset();
}

function validateForm() {
    const email = emailInput_log.value.trim();

    const password = passwordInput_log.value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (email === "" || password === "") {
        showMessage("Please enter  email.", emailError);
        showMessage("Please enter  password.", passwordError);
        return;
    }
    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        return true;
    } else {
        emailError.textContent = "";
        passwordError.textContent = "";
        showMessage("Invalid email or password.", emailError);
        showMessage("Invalid email or password.", passwordError);

        return false;
    }
}

loginForm.addEventListener("submit", processLogin);
