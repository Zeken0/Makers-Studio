import { getFromLocalStorage } from "./libs/localHelpers.js";

let data = JSON.parse(localStorage.getItem("cart"));

let totalAmount = 0;
for (let i = 0; i < data.length; i++) {
  totalAmount += Number(data[i].price);
  document.querySelector(".total-Price").innerHTML = `
  $${totalAmount}.00
  `;
}

data.forEach((artwork) => {
  if (!localStorage.length === 1) {
    document.querySelector(".cart-mid").innerHTML += `
    <div class="cart-mid-left">The cart is empty !</div>
    <div class="cart-mid-center">
    <input type="text" aria-label="Quantity" value="-" />
    </div>
    <div class="cart-mid-right">$0.00</div>
    `;
  } else {
    document.querySelector(".cart-mid").innerHTML += `
    <div class="cart-mid-left">
    <i class="fas fa-times" data-id="${artwork.id}"></i>
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
  }
});

let deleteItemBtn = document.querySelectorAll(".fa-times");
let cartItems = getFromLocalStorage("cart");

console.log(deleteItemBtn.id);
let isInStorage = cartItems.find((item) => {
  return item.id === deleteItemBtn.dataset.id;
});
deleteItemBtn.onclick = () => {
  Storage.removeItem(isInStorage);
};
