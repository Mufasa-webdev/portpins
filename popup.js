function showLocationPopup(location, category) {
  const colors = ["#FF69B4", "#34A85A", "#FFC107", "#8E24AA", "#4CAF50"];
  const sidesArray = Array.isArray(location.sides)
    ? location.sides
    : location.sides
      ? location.sides.split(",")
      : [];
  const sidesHtml = sidesArray
    .map((side, index) => {
      const color = colors[index % colors.length];
      return `<span class="side-pill" style="background-color: ${color};">${side.trim()}</span>`;
    })
    .join("");
  const mapUrl = location.map;
  const images = [location.image, ...(location.gallery || [])];
  const imageHtml = images
    .map((image, index) => {
      return `
        <div class="popup-slide ${index === 0 ? "active" : ""}">
          <img src="${image}" alt="${location.name}">
        </div>
      `;
    })
    .join("");
  const paginationHtml = images
    .map((_, index) => {
      return `
        <div class="pagination-item ${index === 0 ? "active" : ""}"></div>
      `;
    })
    .join("");
  let ctaButton = "";
  if (category === "Hotels" || category === "Transfers") {
    ctaButton = `<a href="#" class="cta-button">Book</a>`;
  } else if (category === "Eat") {
    ctaButton = `<a href="#" class="cta-button">Contact</a>`;
  } else if (category === "Tours") {
    ctaButton = `<a href="#" class="cta-button">Book Tour</a>`;
  }

  document.body.insertAdjacentHTML("beforeend", popupHtml);

  const slider = document.querySelector(".popup-slider");
  const paginationItems = document.querySelectorAll(".pagination-item");
  let currentIndex = 0;
  paginationItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      updateActiveSlide(index);
    });
  });
  function updateActiveSlide(index) {
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[index].classList.add("active");
    const slides = document.querySelectorAll(".popup-slide");
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
    currentIndex = index;
  }

  const closeButton = document.querySelector(".close-popup");
  closeButton.addEventListener("click", () => {
    const popupOverlay = document.querySelector(".popup-overlay");
    popupOverlay.remove();
  });
}
