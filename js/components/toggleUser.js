import { getUser } from "../libs/localHelpers.js";

(function () {
  if (getUser("user").confirmed === true) {
    document.querySelector("#nav-user").innerHTML = `
		Sign Out
	`;

    document.querySelector("#nav-user").onclick = () => {
      window.location = "index.html";
      storage.removeItem(user);
    };
  } else {
    document.querySelector("#nav-user").innerHTML = `
		  Login
		`;

    document.querySelector("#nav-user").onclick = () => {
      window.location = "loginPage.html";
    };
  }
})();
