import writeHtmlToDom from "./libs/writeHtmlToDom.js";
import alert from "./components/alert.js";

let container = document.querySelector(".products-artworks");

async function getAllArtworksData() {
  try {
    document.querySelector(".products-artworks").innerHTML = `
    <img class="loadingGif" src="/images/Loading-gif.gif" alt="a loading gif">
    `;
    const repsonse = await axios.get(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.data;
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
  } catch (error) {
    alert("alert-danger", "An error has occured");
  } finally {
    document.querySelector(".loadingGif").style.display = "none";
  }
}
getAllArtworksData();
