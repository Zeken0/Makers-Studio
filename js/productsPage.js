import writeHtmlToDom from "./libs/writeHtmlToDom.js";

import alert from "./components/alert.js";

let container = document.querySelector(".products-artworks");

async function getAllArtworksData() {
  try {
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.json();
    let artworks = data;

    artworks.forEach((artwork) => {
      writeHtmlToDom(container, artwork);
    });

    const searchInput = document.querySelector("#bar");
    searchInput.onkeyup = function () {
      let filteredArtworks = artworks.filter((artwork) => {
        return artwork.Title.toLowerCase().includes(this.value.toLowerCase());
      });

      container.innerHTML = "";

      filteredArtworks.forEach((artwork) => {
        writeHtmlToDom(container, artwork);
      });
    };

    /* ------------------------------------------ HideLoader ---------------------------------------------- */
    const loaderContent = document.querySelector(".loader");

    setTimeout(function () {
      loaderContent.style.display = "none";
      showMoreBtn.style.display = "block";
    });
    /* ----------------------------------------- /HideLoader ---------------------------------------------- */
  } catch (error) {
    alert("alert-danger", "An error has occured");
  }
}
getAllArtworksData();
