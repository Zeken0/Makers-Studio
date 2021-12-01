import { saveToLocalStorage } from "./libs/localHelpers.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getSingleArtwork(postId) {
  try {
    console.log(postId);
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/" + postId
    );
    const artwork = await repsonse.json();
    const artworkContainer = document.querySelector(".productsDetailsMain");

    document.title += `
                ${artwork.Title}
            `;
    artworkContainer.innerHTML = `
      <div class="productsDetailsMain-left">
      <img src="${artwork.Image_url}" alt="image of a painting">
      </div>
      <div class="productsDetailsMain-right">
      <h1>${artwork.Title}</h1>
      <span>$${artwork.Price}.00</span>
      <p>${artwork.Description}</p>
      <button class="productsDetailsMain-right-btn" data-id="${artwork.id}" data-image="${artwork.Image_url}" data-name="${artwork.Title}" data-price="$${artwork.Price}.00">Add To Cart</button>
      </div>
    `;

    /* ------------------------------------------ addToLocalStorage ---------------------------------------------- */
    let addToCartButton = document.querySelector(
      ".productsDetailsMain-right-btn"
    );
    console.log(addToCartButton);

    addToCartButton.onclick = () => {
      let artwork = {
        id: addToCartButton.dataset.id,
        image: addToCartButton.dataset.image,
        name: addToCartButton.dataset.name,
        price: addToCartButton.dataset.price,
      };

      let allArtworks = [];
      allArtworks.push(artwork);
      saveToLocalStorage("cart", allArtworks);
    };

    /* ------------------------------------------ hideLoader ---------------------------------------------- */
    const loaderContent = document.querySelector(".loader");

    setTimeout(function () {
      loaderContent.style.display = "none";
    });
    /* ----------------------------------------- /hideLoader ---------------------------------------------- */
  } catch (error) {
    document.querySelector(".alert").innerHTML += thisIsAnAlert(
      "An error has occured",
      "danger"
    );
    console.log(error);
  } finally {
    setTimeout(function () {
      document.querySelector(".alert").innerHTML = "";
    }, 3000);
  }
}

getSingleArtwork(id);
