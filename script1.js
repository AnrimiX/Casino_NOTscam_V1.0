const modal = document.getElementById("modal");
const logo = document.getElementById("logo");
const expanded = document.getElementById("expanded");
const closeBtn = document.querySelector(".close");

logo.onclick = function() {
  expanded.src = this.src; // показує це ж зображення
  modal.style.display = "flex";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
