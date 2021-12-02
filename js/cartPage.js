let data = JSON.parse(localStorage.getItem("cart"));

let totalAmount = 0;
for (let i = 0; i < data.length; i++) {
  totalAmount += Number(data[i].price);
  document.querySelector(".total-Price").innerHTML = `
  $${totalAmount}.00
  `;
}

data.forEach((artwork) => {
  console.log(window.localStorage.value);
  if (!window.localStorage) {
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
    <i class="fas fa-times"></i>
    <img src="${artwork.image}" alt="">
    <h2>${artwork.name}</h2>
    </div>
    <div class="cart-mid-center">
    <input type="text" aria-label="Quantity" value="-" />
    </div>
    <div class="cart-mid-right">$${artwork.price}.00</div>
    </div>
    `;
  }
});
