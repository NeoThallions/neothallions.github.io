document.querySelectorAll(".anchor-container").forEach((container) => {
  const anchor = container.querySelector(".anchor");
  const imgContainer = container.querySelector(".image-container");
  let timeout;

  anchor.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
    const imgURL = anchor.getAttribute("data-img");
    const href = anchor.getAttribute("href");

    imgContainer.innerHTML = `
      <a href="${href}">
        <img src="${imgURL}" alt="Image liée">
      </a>
    `;
    imgContainer.classList.add("show");
  });

  container.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      imgContainer.classList.remove("show");
      imgContainer.innerHTML = "";
    }, 200);
  });
});
