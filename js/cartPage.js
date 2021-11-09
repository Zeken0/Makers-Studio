import writeHtmlToDom from "./libs/writeHtmlToDom.js";

let containerOne = document.querySelector(".container");
let containerTwo = document.querySelector(".containerTwo");

async function getData() {
  try {
    const repsonse = await fetch("https://highart.herokuapp.com/Artists/");
    const data = await repsonse.json();
    let artists = data;

    artists.forEach((artist) => {
      writeHtmlToDom(containerOne, artist);
      writeHtmlToDom(containerTwo, artist);
    });

    const searchInput = document.querySelector("#bar");
    searchInput.onkeyup = function () {
      let filteredArtists = artists.filter((artist) => {
        return artist.albumName
          .toLowerCase()
          .includes(this.value.toLowerCase());
      });

      containerOne.innerHTML = "";
      containerTwo.innerHTML = "";

      filteredArtists.forEach((artist) => {
        writeHtmlToDom(containerOne, artist);
        writeHtmlToDom(containerTwo, artist);
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
    document.querySelector(".alert").innerHTML += thisIsAnAlert(
      "An error has occured",
      "danger"
    );
  } finally {
    setTimeout(function () {
      document.querySelector(".alert").innerHTML = "";
    }, 3000);
  }
}
getData();
