import alert from "./components/alert.js";

async function getHeroBannerData() {
  try {
    document.querySelector(".heroBanner-Image").innerHTML = `
    <img class="loadingGif" src="/images/Loading-gif.gif" alt="a loading gif">
    `;
    const repsonse = await fetch("https://makers-studio.herokuapp.com/home/");
    const data = await repsonse.json();
    let heroData = data;

    document.querySelector(".herobanner-btn").onclick = () => {
      window.location = "productsPage.html";
    };

    document.querySelector(".heroBanner-Image").innerHTML += `
      <img src="${heroData.Hero_banner_url}" alt="${heroData.Hero_banner_alt_text}">
      `;
  } catch (error) {
    alert("alert-danger", "An error has occured");
  } finally {
    document.querySelector(".loadingGif").style.display = "none";
  }
}
getHeroBannerData();

async function getFeaturedArtworksData() {
  try {
    document.querySelector(".featured-products-artwork").innerHTML = `
      <img class="loadingGifTwo" src="/images/Loading-gif.gif" alt="a loading gif">
    `;
    const repsonse = await axios.get(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.data;
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
  } catch (error) {
    alert("alert-danger", "An error has occured");
  } finally {
    document.querySelector(".loadingGifTwo").style.display = "none";
  }
}
getFeaturedArtworksData();
