import writeHtmlToDom from './utils/writeHtmlToDom.js';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from './utils/localHelpers.js';

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getPosts(postId) {
  try {
    console.log(postId);
    const repsonse = await fetch(
      "https://highart.herokuapp.com/Artists/" + postId
    );
    const data = await repsonse.json();
    const charactersElm = document.querySelector('.characters');
		let characterHTML = '';

    document.title += `
                ${data.albumName}
            `;
    document.querySelector(".container").innerHTML = `
                <div class="content">
                    <h1>
                        ${data.albumName}
                    </h1>
                    <h2>
                        ${data.artistName} <i class="fas fa-user"></i>
                    </h2>
                    <p>
                        ${data.startReview}
                    </p>
                    <img class="zoom" src="${data.albumCoverUrl}" alt="Image of an album cover"/>
                    <div class="modal-container">
                        <img class="modal" src="${data.albumCoverUrl}" alt="Image of an album cover"/>
                    </div>
                    <p>
                        ${data.endReview}
                    </p>
                </div>
            `;

            writeHtmlToDom(charactersElm, characterHTML);

		let hearts = document.querySelectorAll('.fa-heart');

		hearts.forEach((singleHeart) => {
			singleHeart.onclick = () => {
				singleHeart.classList.toggle('fas');

				let character = {
					id: singleHeart.dataset.id,
					img: singleHeart.dataset.img,
					nickname: singleHeart.dataset.nickname,
					birthday: singleHeart.dataset.birthday,
				};

				let favourites = getFromLocalStorage('favourites');

				// find
				let isInStorage = favourites.find((singleFavourite) => {
					return singleFavourite.id === singleHeart.dataset.id;
				});

				if (isInStorage === undefined) {
					favourites.push(character);
					saveToLocalStorage('favourites', favourites);
				} else {
					// if the singleFavourite.id is the same as singleHeart.dataset.id do not add it to the array
					let removedFavouritesArray = favourites.filter((singleFavourite) => {
						return singleFavourite.id !== singleHeart.dataset.id;
					});

					saveToLocalStorage('favourites', removedFavouritesArray);
				}
			};
		});

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
getPosts(id);
