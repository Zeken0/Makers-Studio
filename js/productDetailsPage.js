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
    document.querySelector(".productsDetailsMain").innerHTML = `
    <img class="loadingGif" src="/images/Loading-gif.gif" alt="a loading gif">
    `;
    const repsonse = await axios.get(
      "https://makers-studio.onrender.com/Products/" + postId
    );
    const artwork = await repsonse.data;
    const artworkContainer = document.querySelector(".productsDetailsMain");

    document.title = `
      ${artwork.Title} - Maker´s Studio 
    `;
    artworkContainer.innerHTML = `
      <div class="productsDetailsMain-left">
      <img src="${artwork.Image_url}"  alt="image of a painting" >
      </div>
      <div class="productsDetailsMain-right">
      <h1>${artwork.Title}</h1>
      <span>$${artwork.Price}.00</span>
      <p>${artwork.Description}</p>
      <button class="productsDetailsMain-right-btn" data-id="${artwork.id}" data-image="${artwork.Image_url}" data-name="${artwork.Title}" data-price="${artwork.Price}">Add To Cart</button>
      </div>
    `;

    /* ----------------------------------------- toggleItemInLocalStorage ---------------------------------------------- */
    let addToCartButton = document.querySelector(
      ".productsDetailsMain-right-btn"
    );

    let cartItems = getFromLocalStorage("cart");

    let isInStorage = cartItems.find((item) => {
      return item.id === addToCartButton.dataset.id;
    });

    if (isInStorage) {
      addToCartButton.innerHTML = `Added To Cart`;
    }

    addToCartButton.onclick = () => {
      let artwork = {
        id: addToCartButton.dataset.id,
        image: addToCartButton.dataset.image,
        name: addToCartButton.dataset.name,
        price: addToCartButton.dataset.price,
      };

      if (isInStorage === undefined) {
        cartItems.push(artwork);
        saveToLocalStorage("cart", cartItems);
      } else {
        let removedcartItemsArray = cartItems.filter((item) => {
          return item.id !== addToCartButton.dataset.id;
        });
        saveToLocalStorage("cart", removedcartItemsArray);
      }
      location.reload();
    };
  } catch (error) {
    alert("alert-danger", "An error has occured");
  } finally {
    document.querySelector(".loadingGif").style.display = "none";
  }
}

getSingleArtwork(id);
