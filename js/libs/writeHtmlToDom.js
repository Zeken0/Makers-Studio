export default function writeHtmlToDom(
  theDomElementToTarget,
  htmlToInsertIntoTheDom
) {
  theDomElementToTarget.innerHTML += `
    <div class="products-artwork-single">
        <a href="/productDetailsPage.html?id=${htmlToInsertIntoTheDom.id}">
            <img src="${htmlToInsertIntoTheDom.Image_url}" alt="an image of a painting"/>
        </a>
        <h2>${htmlToInsertIntoTheDom.Title}</h2>
        <span>$${htmlToInsertIntoTheDom.Price}.00</span>
    </div>
    `;
}
