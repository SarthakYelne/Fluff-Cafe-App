document.addEventListener("DOMContentLoaded", function () {
  const text =
    "Welcome to Our Franchise Outlet! Join Us for a Prosperous Future.";
  const typingElement = document.querySelector(".typing");

  let index = 0;

  function typeText() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 300); // Adjust typing speed here
    }
  }

  typeText();
});
