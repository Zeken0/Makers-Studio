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
      if (artwork.Featured === true) {
        document.querySelector(".featured-products-artwork").innerHTML += `
          <div class="featured-products-artwork-single">
          <a href="/productDetailsPage.html?id=${artwork.id}">
            <img src="${artwork.Image_url}" alt="an image of a painting"/>
          </a>
            <h3>${artwork.Title}</h3>
            <span>$${artwork.Price}.00</span>
          </div>
        `;
      }
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
