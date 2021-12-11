import { getUser } from "./libs/localHelpers.js";
import alert from "./components/alert.js";

let addForm = document.querySelector(".add-form");

addForm.onsubmit = async function (event) {
  event.preventDefault();
  const title = document.querySelector("#inputTitle");
  const price = document.querySelector("#inputPrice");
  const image_url = document.querySelector("#inputImageUrl");
  const featured = document.querySelector("#flexSwitchCheckDefault");
  const description = document.querySelector("#inputDescription");

  try {
    let newPiece = {
      title: title.value,
      price: price.value,
      image_url: image_url.value,
      featured: featured.value,
      description: description.value,
    };

    let response = await axios.post(
      "https://makers-studio.herokuapp.com/Products",
      newPiece,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUser("jwt")}`,
        },
      }
    );

    // if we have data back show the user something
    console.log(response);

    alert("alert-success", "The art piece has been added successfully");
  } catch (error) {
    alert("alert-danger", "An error has occured");
  }
};
