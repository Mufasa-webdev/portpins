function showLocationPopup(location, category, terminal) {
  const colors = ["#FF69B4", "#34A85A", "#FFC107", "#8E24AA", "#4CAF50"];
  const images = [location.image, ...(location.gallery || [])];

  let slidesHtml = "";
  let dotsHtml = "";
  images.forEach((image, index) => {
    slidesHtml += `<div class="p-slide ${index === 0 ? "p-active" : ""}"><img src="${image}" alt="${location.name}" loading="lazy"></div>`;
    dotsHtml += `<div class="p-dot ${index === 0 ? "p-active" : ""}"></div>`;
  });

  const sidesArray = Array.isArray(location.sides)
    ? location.sides
    : location.sides
      ? location.sides.split(",")
      : [];
  const sidesHtml = sidesArray
    .map(
      (side, index) =>
        `<span class="p-side-pill" style="background-color: ${colors[index % colors.length]};">${side.trim()}</span>`,
    )
    .join("");

  let featuresHtml = "";
  if (location.description && Array.isArray(location.description)) {
    featuresHtml = `<div class="p-features">${location.description.map((item) => `<div class="p-feature-item"><i class="fas fa-check-circle"></i> ${item}</div>`).join("")}</div>`;
  } else if (location.description) {
    featuresHtml = `<p class="p-desc">${location.description}</p>`;
  }

  const ctaLabels = {
    Hotels: "Book",
    Transfers: "Book",
    Eat: "Contact",
    Tours: "Book Tour",
    Shop: "Shop Now",
    Favorites: "Learn More",
  };
  const label = ctaLabels[category] || "Learn More";
  const link = location.cta || location.map || "#";
  const ctaButton =
    link !== "#"
      ? `<a href="${link}" target="_blank" rel="noopener" class="p-cta-btn">${label}</a>`
      : "";

  const isFav = isFavorite(location.name);

  const popupHtml = `
    <div class="p-overlay">
      <div class="p-popup">
        <button class="p-close-btn"><i class="fas fa-times"></i></button>

        <button class="popup-fav-btn ${isFav ? "active" : ""}"
                data-name="${location.name}">
          <i class="fas fa-heart"></i>
        </button>

        <div class="p-slider"><div class="p-slides">${slidesHtml}</div><div class="p-pagination">${dotsHtml}</div></div>

        <div class="p-content">
          ${location.tag ? `<div class="p-tag ${location.tag}">${location.tag}</div>` : ""}
          <div class="p-header"><h2>${location.name}</h2><div class="p-price"><span class="p-from">From</span><span class="p-amount">${location.price}</span><span class="p-per">per person</span></div></div>
          <p class="p-location"><i class="fas fa-map-marker-alt"></i> ${location.location}</p>
          <div class="p-details"><p><i class="fas fa-clock"></i> ${location.time}</p>${location.rating ? `<p><i class="fas fa-star"></i> ${location.rating}</p>` : ""}</div>
          ${location.info ? `<p class="p-info">${location.info}</p>` : ""}
          ${featuresHtml}
          ${sidesHtml ? `<div class="p-sides">${sidesHtml}</div>` : ""}
          ${ctaButton}
          ${location.map ? `<a href="${location.map}" target="_blank" class="p-map-link"><i class="fas fa-directions"></i> Open in Maps</a>` : ""}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", popupHtml);
  const popup = document.body.lastElementChild;

  // Store location data on the popup element so we can access it in the click handler
  popup.dataset.location = JSON.stringify(location);
  popup.dataset.terminal = terminal;

  // SLIDER LOGIC
  const slides = popup.querySelectorAll(".p-slide");
  const dots = popup.querySelectorAll(".p-dot");
  let currentIndex = 0;
  function updateSlide(index) {
    slides.forEach((slide, i) =>
      slide.classList.toggle("p-active", i === index),
    );
    dots.forEach((dot, i) => dot.classList.toggle("p-active", i === index));
    currentIndex = index;
  }
  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => updateSlide(index)),
  );
  let touchStartX = 0;
  const slider = popup.querySelector(".p-slider");
  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  slider.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50)
      updateSlide((currentIndex + 1) % slides.length);
    if (touchEndX - touchStartX > 50)
      updateSlide((currentIndex - 1 + slides.length) % slides.length);
  });
  let autoPlay = setInterval(() => {
    updateSlide((currentIndex + 1) % slides.length);
  }, 4000);
  slider.addEventListener("touchstart", () => clearInterval(autoPlay));

  // CLOSE LOGIC
  popup
    .querySelector(".p-close-btn")
    .addEventListener("click", () => popup.remove());
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.remove();
  });

  // HEART LOGIC - NEW: Use event listener instead of onclick
  const favBtn = popup.querySelector(".popup-fav-btn");
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const loc = JSON.parse(popup.dataset.location);
    const term = popup.dataset.terminal;

    const added = toggleFavorite(loc.name, loc.image, term, loc);
    favBtn.classList.toggle("active", added || isFavorite(loc.name));
    renderFavorites(); // update top bar instantly

    // Also update the card heart if we're still on details page
    const cardBtn = document.querySelector(
      `.location-item[data-name="${loc.name}"].fav-btn`,
    );
    if (cardBtn)
      cardBtn.classList.toggle("active", added || isFavorite(loc.name));
  });
}
