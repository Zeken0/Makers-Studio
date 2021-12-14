import alert from "./components/alert.js";
import { getUser } from "./libs/localHelpers.js";

if (getUser("user") === null) {
  window.location = "loginPage.html";
}

document.querySelector(".admin-btn").onclick = () => {
  window.location = "addArtworkPage.html";
};

let container = document.querySelector(".table-data");

async function getArtworkAndDeleteArtwork() {
  try {
    document.querySelector(".table-data").innerHTML = `
    <img class="loadingGif" src="/images/Loading-gif.gif" alt="a loading gif">
    `;
    const repsonse = await axios.get(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.data;
    let artworks = data;

    container.innerHTML = ``;

    artworks.forEach((artwork) => {
      container.innerHTML += `
      <a href="/editArtworkPage.html?id=${artwork.id}">
      </a>
      <tr>
        <th scope="row">${artwork.id}</th>
        <td>${artwork.Price}</td>
        <td>${artwork.Title}</td>
        <td>${artwork.Featured}</td>
        <td>
          ${artwork.Description}
        </td>
        <td>
          ${artwork.Image_url}
        </td>
        <td>
        <a href="/editArtworkPage.html?id=${artwork.id}">
        <i class="fas fa-edit"></i>
        </a>
        </td>
        <td><i class="fas fa-trash-alt" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id=${artwork.id}></i></td>
      </tr>
        `;
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
                <button type="button" id="confirmButton" class="btn btn-primary">Yes</button>
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
          window.location.reload();
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
