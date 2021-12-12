import { getUser } from "./libs/localHelpers.js";
import alert from "./components/alert.js";

if (getUser("user") === null) {
  window.location = "loginPage.html";
}

let title = document.querySelector("#inputTitle");
let price = document.querySelector("#inputPrice");
let image_url = document.querySelector("#inputImageUrl");
let featured = document.querySelector("#flexSwitchCheckDefault");
let description = document.querySelector("#inputDescription");
const form = document.querySelector(".add-form");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getSpecificArtwork() {
  const repsonse = await axios.get(
    "https://makers-studio.herokuapp.com/Products/" + id
  );
  const artwork = await repsonse.data;

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
    title: title.value,
    price: price.value,
    image_url: image_url.value,
    featured: featured.value,
    description: description.value,
  };

  const response = await axios.put(
    `https://makers-studio.herokuapp.com/Products/` + id,
    updatedPiece,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUser("jwt")}`,
      },
    }
  );

  alert("alert-success", "Art piece has been updated successfully");

  console.log(response);
};
