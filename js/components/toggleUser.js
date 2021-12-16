import { getUser } from "../libs/localHelpers.js";

(function () {
  if (getUser("user") !== null) {
    document.querySelector("#nav-user").innerHTML = `
		  Sign Out
	  `;

    document.querySelector("#nav-user").onclick = () => {
      window.location = "index.html";
      localStorage.removeItem("user");
    };
    document.querySelector("#nav-admin-user").style.display = "block";
  } else {
    document.querySelector("#nav-user").innerHTML = `
		  Login
		`;
    document.querySelector("#nav-user").onclick = () => {
      window.location = "loginPage.html";
    };
  }
})();
