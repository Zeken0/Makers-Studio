import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./libs/localHelpers.js";

import alert from "./components/alert.js";

let data = getFromLocalStorage("cart");
let totalAmount = 0;
for (let i = 0; i < data.length; i++) {
  totalAmount += Number(data[i].price);
  document.querySelector(".total-Price").innerHTML = `
  $${totalAmount}.00
  `;
}

if (data.length === 0) {
  document.querySelector(".cart-mid").innerHTML = `
    <div class="cart-mid-single">
          <div class="cart-mid-left">
            The cart is empty!
          </div>
          <div class="cart-mid-center">
            <input type="text" aria-label="Quantity" value="-" />
          </div>
          <div class="cart-mid-right">$0.00</div>
    </div>
  `;
}
data.forEach((artwork) => {
  document.querySelector(".cart-mid").innerHTML += `
      <div class="cart-mid-single">
        <div class="cart-mid-left">
          <i class="fas fa-times" data-id="${artwork.id}" data-image="${artwork.Image_url}" data-name="${artwork.Title}" data-price="${artwork.Price}"></i>
          <a href="productDetailsPage.html?id=${artwork.id}">
            <img src="${artwork.image}" alt="an image of a painting">
          </a>
          <a href="productDetailsPage.html?id=${artwork.id}">
            <h2>${artwork.name}</h2>
          </a>
        </div>
        <div class="cart-mid-center">
          <input type="text" aria-label="Quantity" value="-" />
        </div>
        <div class="cart-mid-right">$${artwork.price}.00</div>
      </div>
    `;
});

let deleteItemBtn = document.querySelectorAll(".fa-times");

deleteItemBtn.forEach((deleteBtn) => {
  deleteBtn.onclick = () => {
    window.location.reload();
    let artwork = {
      id: deleteBtn.dataset.id,
    };

    let cartItems = getFromLocalStorage("cart");

    let isInStorage = cartItems.find((item) => {
      return item.id === deleteBtn.dataset.id;
    });

    if (isInStorage === undefined) {
      cartItems.push(artwork);
      saveToLocalStorage("cart", cartItems);
    } else {
      let removedcartItemsArray = cartItems.filter((item) => {
        return item.id !== deleteBtn.dataset.id;
      });
      saveToLocalStorage("cart", removedcartItemsArray);
    }
  };
});

document.querySelector(".cart-btn").onclick = () => {
  localStorage.removeItem("cart");
  alert("alert-success", "The art piece has been purchased successfully");
  setTimeout(() => {
    window.location = "index.html";
  }, 4000);
};
