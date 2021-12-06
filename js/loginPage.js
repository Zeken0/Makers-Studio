import {
  testLengthofTextBoxValue,
  testEmailAddress,
} from "./libs/validation.js";

import alert from "./components/alert.js";

import { saveToLocalStorage } from "./libs/localStorageHelper.js";

let form = document.querySelector(".form");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

form.onsubmit = async function (event) {
  event.preventDefault();

  if (
    testLengthofTextBoxValue(password.value, 1) &&
    testEmailAddress(email.value)
  ) {
    // Lets do postman first before we do anything
    try {
      // Its important to name things exactly the way strapi asks you to
      // https://strapi.io/documentation/developer-docs/latest/guides/auth-request.html#login-as-a-reader
      const { data } = await axios.post(
        "http://localhost:1337/auth/local",

        {
          identifier: email.value,
          password: password.value,
        }
      );

      console.log(data);

      // 1. Save the token in local storage because we will send it to the server later on
      saveToLocalStorage("jwt", data.jwt);
      // 2. Save user to local storage

      saveToLocalStorage("user", data.user);

      // 3. redirect a user to a new page if everything is ok
      window.location.href = "./adminPage.html";
    } catch (error) {
      // if there is an error show the user a message.
      alert("alert-danger", "Your credentials were incorrect");
    }

    // Lets read the strapi documentation to log a user in.
  } else {
    alert("alert-danger", "Please enter proper values for the inputs");
  }
};
