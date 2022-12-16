import { createFormListener } from "./handlers/createPost.mjs";

const btn = document.querySelectorAll(".bttn");
let postBtn = document.querySelector(".postBtn");
const updateBtn = document.querySelectorAll(".updateBtn");


// const dateField = document.querySelector('input[name="endsAt"]');
// const datetoISO = new Date(dateField.value).toISOString();


postBtn.addEventListener("click", createFormListener());
