import { registerFormListener } from "./handlers/registeruser.mjs";
import { loginFormListener } from "./handlers/login.mjs";
import { removeListing } from "./api/listings/delete.mjs";
import * as post from "./api/listings/index.mjs";

const signupBtn = document.querySelector("#signupBtn");
const loginBtn = document.querySelector("#loginBtn");
const regAdds = document.querySelectorAll(".reg");
const signupText = "Sign-up";
const loginText = "Login";
const passwordWarning = document.querySelector(".passwordCheck");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");

/** Function to change formimputs to suit registration or login functionality:
 *  creating a user, or logging with an existing one.
 * @param  {event} "click"" listens to the signup button to change the form to registration
 * @param  {function} regForm runs a forEach function to change display property of form elements.
 */
signupBtn.addEventListener("click", function regForm() {
  regAdds.forEach((element) => {
    element.classList.toggle("hidden");
  });
  if (signupBtn.textContent.toLowerCase().includes(signupText.toLowerCase())) {
    signupBtn.textContent = "Already Registered?";
    loginBtn.textContent = "Create Account";
    document.getElementById("name").required = true;
    document.getElementById("passwordConfirm").required = true;
  } else {
    signupBtn.textContent = signupText;
    loginBtn.textContent = loginText;
    passwordWarning.classList.add("hidden");
    document.getElementById("name").required = false;
    document.getElementById("passwordConfirm").required = false;
  }
});

/**
 * @param  {event} "click" clickevent to run function
 * @param  {function} formChanger runs on "click" event and determines to execute a login or registration request to the API if the right criteria are met.
 * @param  {function} loginFormListener function creates an object fromt he form inputs
 * @param  {function} registerFormListener function creates an object from the form inputs and creates an account
 * @param  {string} loginBtn.textContent the login button clicked with the different text-content values determines which function gets called
 * @param  {function} checkPasswords checks for correct password input before running user registration
 *
 */
loginBtn.addEventListener("click", function formChanger() {
  if (loginBtn.textContent === loginText) {
    loginFormListener();
  } else if (
    loginBtn.textContent === "Create Account" &&
    checkPasswords() === true
  ) {
    registerFormListener();
  } else {
    passwordWarning.classList.remove("hidden");
    event.preventDefault();
  }
});

/**
 * function to determine if registration of user-password is correct
 * @param  {password} passwordConfirm.value checks for correct password value from input
 */
export function checkPasswords() {
  if (passwordConfirm.value === password.value) {
    return true;
  } else {
    return false;
  }
}

