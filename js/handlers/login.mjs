import { login } from "../api/auth/login.mjs";


/**
 * Listens for a submitevent on the loginform to create an object with user-data to send to the api
 * @param  {form} form targets the user login form
 * @param  {event} form.addEventListener listens for submit event on the form 
 * @param  {object} profile creates an object from the login form inputs
 * @param  {function} login takes in the object as parameter to send the formdata to the api
 * @param  {string} alert alerts the user they have successfully logged in
 * @param  {string} window.location.replace redirects the user on successful login to the postfeed
 */
export function loginFormListener() {
  const form = document.querySelector(".regForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    login(profile);
    alert("Login Success");
    window.location.replace("/profile.html");
  });
}
