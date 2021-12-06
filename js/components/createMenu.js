import { getUser } from "../libs/localStorageHelper.js";

(function () {
  if (getUser("user")) {
    document.querySelector(".menu").innerHTML = `
		  <div class="menu-item">
		    <a href="addCar.html">Add a car</a>
		  </div>`;
  } else {
    document.querySelector(".menu").innerHTML = `
		  <div class="menu-item">
		    <a href="index.html">Home</a>
		  </div>
		  <div class="menu-item">
		    <a href="login.html">Login</a>
		  </div>
		`;
  }
})();
