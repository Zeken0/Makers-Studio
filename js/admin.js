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
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.json();
    let artworks = data;

    container.innerHTML = ``;

    artworks.forEach((artwork) => {
      container.innerHTML += `
      <a href="/editArtworkPage.html?id=${artwork.id}">
      </a>
      <tr>
        <th scope="row">${artwork.id}</th>
        <td>$${artwork.Price}.00</td>
        <td>${artwork.Title}</td>
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
        <td><i class="fas fa-trash-alt" data-id=${artwork.id}></i></td>
      </tr>
        `;
    });

    let deleteButtons = document.querySelectorAll(".fa-trash-alt");

    deleteButtons.forEach(function (deleteButton) {
      deleteButton.onclick = async function () {
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
    });
  } catch (error) {
    alert("alert-danger", "An error has occured");
  } finally {
    document.querySelector(".loadingGif").style.display = "none";
  }
}
getArtworkAndDeleteArtwork();
