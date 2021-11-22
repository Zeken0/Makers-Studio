import writeHtmlToDom from "./libs/writeHtmlToDom.js";

async function getHeroBannerData() {
  try {
    const repsonse = await fetch("https://makers-studio.herokuapp.com/home/");
    const data = await repsonse.json();
    let heroData = data;

    document.querySelector(".heroBanner-Image").innerHTML += `
      <img src="${heroData.Hero_banner_url}" alt="${heroData.Hero_banner_alt_text}">
      `;

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
getHeroBannerData();

async function getFeaturedArtworksData() {
  try {
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.json();
    let featuredData = data;

    featuredData.forEach((artwork) => {
      let desiredArtwork = ${artwork.Title};

      document.querySelector(".featured-products-artwork").innerHTML += `
      <div class="featured-products-artwork-single">
      <img src="${artwork.Image_url}" alt="an image of a painting">
      <h3>${artwork.Title}</h3>
      <h4>${artwork.Price}$</h4>
      </div>
        `;
    });

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
getFeaturedArtworksData();
