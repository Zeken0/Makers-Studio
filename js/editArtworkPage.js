import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "./libs/localHelpers.js";

import alert from "./components/alert.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getSingleArtwork(postId) {
  try {
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/" + postId
    );
    const artwork = await repsonse.json();
    const Container = document.querySelector(".editArtworkMain");

    document.title = `
                  ${artwork.Title} - Maker´s Studio 
              `;
    Container.innerHTML = `
        <div class="productsDetailsMain-left">
        <img src="${artwork.Image_url}"  alt="image of a painting" >
        </div>
        <div class="productsDetailsMain-right">
        <h1>${artwork.Title}</h1>
        <span>$${artwork.Price}.00</span>
        <p>${artwork.Description}</p>
        <button class="productsDetailsMain-right-btn">Add To Cart</button>
        </div>
      `;
  } catch (error) {
    alert("alert-danger", "An error has occured");
  }
}
getSingleArtwork(id);
