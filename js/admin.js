import alert from "./components/alert.js";
import { getUser } from "./libs/localHelpers.js";

if (getUser("user") === null) {
  window.location = "loginPage.html";
}

document.querySelector(".admin-btn").onclick = () => {
  window.location = "addArtworkPage.html";
};

let container = document.querySelector(".admin-body");

async function getArtworkAndDeleteArtwork() {
  try {
    document.querySelector(".admin-body").innerHTML = `
    <img class="loadingGif" src="/images/Loading-gif.gif" alt="a loading gif">
    `;
    const repsonse = await axios.get(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.data;
    let artworks = data;

    container.innerHTML = ``;

    artworks.forEach((artwork) => {
      if (artwork.Featured === true) {
        container.innerHTML += `
          <div class="admin-body-piece">
            <div class="featured-piece">
              <span>Featured</span>
            </div>
            <a href="/productDetailsPage.html?id=${artwork.id}">
                <img src="${artwork.Image_url}" alt="an image of a painting"/>
            </a>
            <h2>${artwork.Title}</h2>
            <div class="admin-tools">
              <span>$${artwork.Price}.00</span>
              <div class="admin-tools-two">
                <a href="/editArtworkPage.html?id=${artwork.id}">
                  <i class="fas fa-edit"></i>
                </a>
                <i class="fas fa-trash-alt" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id=${artwork.id}></i>
              </div>
            </div>
          </div>
        `;
      } else {
        container.innerHTML += `
        <div class="admin-body-piece">
          <a href="/productDetailsPage.html?id=${artwork.id}">
              <img src="${artwork.Image_url}" alt="an image of a painting"/>
          </a>
          <h2>${artwork.Title}</h2>
          <div class="admin-tools">
            <span>$${artwork.Price}.00</span>
            <div class="admin-tools-two">
              <a href="/editArtworkPage.html?id=${artwork.id}">
                <i class="fas fa-edit"></i>
              </a>
              <i class="fas fa-trash-alt" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id=${artwork.id}></i>
            </div>
          </div>
        </div>
      `;
      }
    });

    let deleteButtons = document.querySelectorAll(".fa-trash-alt");

    deleteButtons.forEach(function (deleteButton) {
      deleteButton.onclick = async function () {
        container.innerHTML += `
        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Warning!</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Do you want to delete this piece?</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  No
                </button>
                <button type="button" id="confirmButton" class="btn btn-primary" data-bs-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>
        `;
        document.querySelector("#confirmButton").onclick = async function () {
          let response = await axios.delete(
            `https://makers-studio.herokuapp.com/Products/${deleteButton.dataset.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getUser("jwt")}`,
              },
            }
          );
          console.log(response);
          getArtworkAndDeleteArtwork();
        };
      };
    });
  } catch (error) {
    alert("alert-danger", "An error has occured");
  } finally {
    document.querySelector(".loadingGif").style.display = "none";
  }
}
getArtworkAndDeleteArtwork();
