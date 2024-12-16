const btn = document.getElementById("btn");
const sideBar = document.getElementById("side-bar");
const remove = document.querySelector(".header-text");

console.log(btn);

btn.addEventListener("click", () => {
    sideBar.classList.toggle("activeBar");
    btn.classList.toggle("active-toggle-btn");
});
remove.addEventListener("click", () => {
    sideBar.classList.remove("activeBar");
    btn.classList.remove("active-toggle-btn");
});
