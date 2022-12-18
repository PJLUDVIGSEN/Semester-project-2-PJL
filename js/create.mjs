import { createFormListener } from "./handlers/createAuction.mjs";

let createBtn = document.querySelector(".createBtn");

createBtn.addEventListener("click", createFormListener());
