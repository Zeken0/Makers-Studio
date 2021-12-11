import { getUser } from "./libs/localHelpers.js";
import alert from "./components/alert.js";

if (getUser("user") === null) {
  window.location = "loginPage.html";
}

const title = document.querySelector("#inputTitle");
const price = document.querySelector("#inputPrice");
const image_url = document.querySelector("#inputImageUrl");
const featured = document.querySelector("#flexSwitchCheckDefault");
const description = document.querySelector("#inputDescription");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getSingleArtwork(postId) {
  try {
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/" + postId
    );
    const artwork = await repsonse.json();

    title.value = `${artwork.Title}`;
    price.value = `${artwork.Price}.00`;
    image_url.value = `${artwork.Image_url}`;
    featured.value = `${artwork.Featured}`;
    description.value = `${artwork.Description}`;
  } catch (error) {
    alert("alert-danger", "An error has occured");
  }
}
getSingleArtwork(id);
