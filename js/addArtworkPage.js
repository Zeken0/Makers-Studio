import { getUser } from "./libs/localHelpers.js";
import alert from "./components/alert.js";

if (getUser("user") === null) {
  window.location = "loginPage.html";
}

let addForm = document.querySelector(".add-form");

addForm.onsubmit = async function (event) {
  event.preventDefault();
  const title = document.querySelector("#title");
  const price = document.querySelector("#price");
  const image_url = document.querySelector("#image_url");
  const featured = document.querySelector("#featured");
  const description = document.querySelector("#description");

  try {
    let newPiece = {
      Title: title.value,
      Price: price.value,
      Image_url: image_url.value,
      Featured: featured.value,
      Description: description.value,
    };

    const response = await axios.post(
      "https://makers-studio.onrender.com/Products/",
      newPiece,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser("jwt")}`,
        },
      }
    );
    alert("alert-success", "The art piece has been added successfully!");
    title.value = "";
    price.value = "";
    image_url.value = "";
    featured.value = "";
    description.value = "";
  } catch (error) {
    alert("alert-danger", "An error has occured");
  }
};
