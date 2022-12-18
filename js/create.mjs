import { createFormListener } from "./handlers/createAuction.mjs";

let createBtn = document.querySelector(".createBtn");


// const dateField = document.querySelector('input[name="endsAt"]');
// const datetoISO = new Date(dateField.value).toISOString();

createBtn.addEventListener("click", createFormListener());
