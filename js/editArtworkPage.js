import { getUser } from "./libs/localHelpers.js";
import alert from "./components/alert.js";

if (getUser("user") === null) {
  window.location = "loginPage.html";
}

const form = document.querySelector(".add-form");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let image_url = document.querySelector("#image_url");
let featured = document.querySelector("#featured");
let description = document.querySelector("#description");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getSpecificArtwork() {
  const repsonse = await axios.get(
    "https://makers-studio.onrender.com/Products/" + id
  );
  const artwork = await repsonse.data;
  if (artwork.Featured === null) {
    artwork.Featured = false;
  }

  title.value = artwork.Title;
  price.value = artwork.Price;
  image_url.value = artwork.Image_url;
  featured.value = artwork.Featured;
  description.value = artwork.Description;
}
getSpecificArtwork();

form.onsubmit = async function (event) {
  event.preventDefault();
  let updatedPiece = {
    Title: title.value,
    Price: price.value,
    Image_url: image_url.value,
    Featured: featured.value,
    Description: description.value,
  };

  const response = await axios.put(
    `https://makers-studio.onrender.com/Products/` + id,
    updatedPiece,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUser("jwt")}`,
      },
    }
  );
  alert("alert-success", "The art piece has been updated successfully!");
};
