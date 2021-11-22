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
