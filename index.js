// Select all anchor elements on the page
const anchors = document.querySelectorAll("a");

// Add a mouseover and mouseout event listener to each anchor
anchors.forEach((anchor) => {
  anchor.addEventListener("mouseover", () => {
    anchor.style.transition = "transform 0.3s ease";
    anchor.style.transform = "translateX(10px)";
  });

  anchor.addEventListener("mouseout", () => {
    anchor.style.transform = "translateX(0)";
  });
});
