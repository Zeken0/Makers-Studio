let data = JSON.parse(localStorage.getItem("cart"));
console.log(data);
data.forEach((artwork) => {
  if (artwork !== null) {
    document.querySelector(".cart-mid").innerHTML += `
    <div class="cart-mid-left">
        <i class="fas fa-times"></i>
        <img src="${artwork.image}" alt="">
        <h2>${artwork.name}</h2>
    </div>
    <div class="cart-mid-center">
        <input type="text" aria-label="Quantity" value="1" />
    </div>
        <div class="cart-mid-right">${artwork.price}</div>
    </div>
    `;
  } else {
    document.querySelector(".cart-mid").innerHTML += `
        <div class="cart-mid-left">The cart is empty !</div>
        <div class="cart-mid-center">
            <input type="text" aria-label="Quantity" value="0" />
        </div>
        <div class="cart-mid-right">$0.00</div>
    `;
  }
});
