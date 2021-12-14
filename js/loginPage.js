import {
  testLengthofTextBoxValue,
  testEmailAddress,
} from "./libs/validation.js";
import alert from "./components/alert.js";
import { saveToLocalStorage } from "./libs/localHelpers.js";

let form = document.querySelector(".form");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

form.onsubmit = async function (event) {
  event.preventDefault();

  if (
    testLengthofTextBoxValue(password.value, 1) &&
    testEmailAddress(email.value)
  ) {
    try {
      const { data } = await axios.post(
        "https://makers-studio.herokuapp.com/auth/local",

        {
          identifier: email.value,
          password: password.value,
        }
      );
      saveToLocalStorage("jwt", data.jwt);
      saveToLocalStorage("user", data.user);

      window.location.href = "./adminPage.html";
    } catch (error) {
      alert("alert-danger", "Your credentials were incorrect");
    }
  } else {
    alert("alert-danger", "Please enter proper values for the inputs");
  }
};
