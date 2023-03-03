import { validate } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    validate(input.target);
  });
});
