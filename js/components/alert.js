export default function alert(cssClass, Message) {
  document.querySelector(
    ".alert"
  ).innerHTML = `<div class="warning  ${cssClass}">
      ${Message}
    </div>`;

  setTimeout(() => {
    document.querySelector(".alert").innerHTML = "";
  }, 5000);
}
