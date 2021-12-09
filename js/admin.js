import alert from "./components/alert.js";

document.querySelector(".admin-btn").onclick = () => {
  window.location = "addArtworkPage.html";
};

let container = document.querySelector(".table-data");

async function getAllArtworksData() {
  try {
    document.querySelector(".table-data").innerHTML = `
    <img class="loadingGif" src="/images/Loading-gif.gif" alt="a loading gif">
    `;
    const repsonse = await fetch(
      "https://makers-studio.herokuapp.com/Products/"
    );
    const data = await repsonse.json();
    let artworks = data;

    artworks.forEach((artwork) => {
      container.innerHTML += `
      <tr>
        <th scope="row">${artwork.id}</th>
        <td>${artwork.Title}</td>
        <td>${artwork.Description}</td>
        <td>${artwork.Image_url}</td>
      </tr>
        `;
    });
  } catch (error) {
    alert("alert-danger", "An error has occured");
  } finally {
    document.querySelector(".loadingGif").style.display = "none";
  }
}
getAllArtworksData();
