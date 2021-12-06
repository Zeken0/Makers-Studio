// Lets get the details out of the user object and show some stuff
import alert from "./components/alert.js";

let carForm = document.querySelector(".form");

carForm.onsubmit = async function (event) {
  event.preventDefault();
  const name = document.querySelector("#name");
  const description = document.querySelector("#description");
  const image = document.querySelector("#image");

  try {
    let newCar = {
      name: name.value,
      description: description.value,
      image_url: image.value,
    };

    let response = await axios.post("http://localhost:1337/cars", newCar, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    // if we have data back show the user something
    console.log(response);

    alert("alert-success", "Car has been created successfully");

    name.value = "";
    description.value = "";
    image.value = "";
  } catch (error) {}
};
