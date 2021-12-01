const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getSingleArtwork(postId) {
  try {
    console.log(postId);
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/" + postId
    );
    const data = await repsonse.json();
    const artworkContainer = document.querySelector(".productsDetailsMain");

    document.title += `
                ${data.Title}
            `;
    artworkContainer.innerHTML = `
      <div class="productsDetailsMain-left">
      <img src="${data.Image_url}" alt="image of a painting">
      </div>
      <div class="productsDetailsMain-right">
      <h1>${data.Title}</h1>
      <span>$${data.Price}.00</span>
      <p>${data.Description}</p>
      <button class="productsDetailsMain-right-btn">Add To Cart</button>
      </div>
    `;

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
