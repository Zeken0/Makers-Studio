// Lets get the details out of the user object and show some stuff
import alert from "./components/alert.js";

let artworkForm = document.querySelector(".form");

artworkForm.onsubmit = async function (event) {
  event.preventDefault();
  const title = document.querySelector("#name");
  const description = document.querySelector("#description");
  const image = document.querySelector("#image");

  try {
    let newArtwork = {
      title: title.value,
      description: description.value,
      image_url: image.value,
    };

    let response = await axios.post(
      "http://localhost:1337/Products",
      newArtwork,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    // if we have data back show the user something
    console.log(response);

    alert("alert-success", "Car has been created successfully");

    name.value = "";
    description.value = "";
    image.value = "";
  } catch (error) {
    alert("alert-danger", "An error has occured");
  }
};
