let currentTerminal = null;

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const terminalName = urlParams.get("terminal");
  const activityToOpen = urlParams.get("activity");
  currentTerminal = ports.find((port) => port.terminal === terminalName);
  if (!currentTerminal) return;

  document.getElementById("terminal-name").textContent =
    currentTerminal.terminal;

  // BACK BUTTON
  const backButton = document.createElement("button");
  backButton.textContent = "← Back";
  backButton.id = "back-button";
  document.body.appendChild(backButton);
  backButton.addEventListener("click", () => window.history.back());

  // HERO SLIDER
  const slides = document.querySelector(".slides");
  const pagination = document.querySelector(".pagination");
  currentTerminal.images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    if (index === 0) slide.classList.add("active");
    slide.innerHTML = `<img src="${image}" alt="${currentTerminal.terminal}">`;
    slides.appendChild(slide);

    const paginationItem = document.createElement("div");
    paginationItem.classList.add("pagination-item");
    if (index === 0) paginationItem.classList.add("active");
    pagination.appendChild(paginationItem);
  });

  const slidesArray = document.querySelectorAll(".slide");
  const paginationItems = document.querySelectorAll(".pagination-item");
  let currentIndex = 0;
  function updateActiveSlide(index) {
    slidesArray.forEach((slide, i) =>
      slide.classList.toggle("active", i === index),
    );
    paginationItems.forEach((item, i) =>
      item.classList.toggle("active", i === index),
    );
    currentIndex = index;
  }
  paginationItems.forEach((item, index) =>
    item.addEventListener("click", () => updateActiveSlide(index)),
  );

  let touchStartX = 0;
  slides.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  slides.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50)
      updateActiveSlide((currentIndex + 1) % slidesArray.length);
    if (touchEndX - touchStartX > 50)
      updateActiveSlide(
        (currentIndex - 1 + slidesArray.length) % slidesArray.length,
      );
  });
  let autoPlayInterval = setInterval(
    () => updateActiveSlide((currentIndex + 1) % slidesArray.length),
    5000,
  );
  slides.addEventListener("touchstart", () => clearInterval(autoPlayInterval));
  slides.addEventListener("touchend", () => {
    autoPlayInterval = setInterval(
      () => updateActiveSlide((currentIndex + 1) % slidesArray.length),
      5000,
    );
  });

  // CATEGORY PILLS
  const categories = Object.keys(currentTerminal.categories);
  const categoryPillsContainer = document.querySelector(".category-pills");
  const icons = {
    Eat: "utensils",
    Shop: "shopping-bag",
    Tips: "lightbulb",
    Hotels: "bed",
    Transfers: "car",
    Tours: "map",
  };

  categories.forEach((category) => {
    const pill = document.createElement("div");
    pill.classList.add("pill");
    pill.dataset.category = category; // so we can find it later
    const iconClass = icons[category] || "map-marker-alt";
    pill.innerHTML = `<i class="fas fa-${iconClass}"></i><span>${category}</span><span class="count">(${currentTerminal.categories[category].length})</span>`;
    pill.addEventListener("click", () => {
      document
        .querySelectorAll(".pill")
        .forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      showLocations(category, currentTerminal.categories[category]);
    });
    categoryPillsContainer.appendChild(pill);
  });

  // Auto click first category
  if (categories.length > 0) {
    categoryPillsContainer.querySelector(".pill").click();
  }

  // Auto scroll to fav from Top Bar
  if (activityToOpen) {
    setTimeout(() => scrollToActivity(activityToOpen), 700);
  }
});

function getTipIcon(index) {
  const icons = [
    "ship",
    "money-bill",
    "shield-alt",
    "wifi",
    "taxi",
    "language",
    "sun",
    "info-circle",
  ];
  return icons[index % icons.length];
}

function showLocations(category, locations) {
  const locationsContainer = document.querySelector(".locations-container");

  if (category === "Tips") {
    locationsContainer.innerHTML = `<h2>Local Tips</h2><div class="tips-grid">${locations.map((tip, index) => `<div class="tip-card"><div class="tip-icon"><i class="fas ${getTipIcon(index)}"></i></div><p>${tip.description}</p></div>`).join("")}</div>`;
    return;
  }

  locationsContainer.innerHTML = `
    <h2>${category}</h2>
    <ul class="locations-list">
      ${locations
        .map((location) => {
          let featuresHtml = "";
          if (location.description && Array.isArray(location.description)) {
            featuresHtml = `<div class="card-features">${location.description.map((item) => `<span class="feature-pill"><i class="fas fa-check"></i> ${item}</span>`).join("")}</div>`;
          }

          // Use data attributes instead of inline JSON to avoid quote issues
          return `
          <li class="location-item"
              data-name="${location.name}"
              data-location='${JSON.stringify(location).replace(/"/g, "&quot;")}'>
            ${location.tag ? `<div class="location-tag ${location.tag}">${location.tag}</div>` : ""}

            <button class="fav-btn ${isFavorite(location.name) ? "active" : ""}"
                    data-name="${location.name}">
              <i class="fas fa-heart"></i>
            </button>

            <img src="${location.image}" alt="${location.name}">
            <div class="location-info">
              <h3>${location.name}</h3>
              <div class="location-details">
                <p><i class="fas fa-money-bill"></i> ${location.price}</p>
                <p><i class="fas fa-clock"></i> ${location.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${location.location}</p>
              </div>
              ${featuresHtml}
            </div>
          </li>`;
        })
        .join("")}
    </ul>
  `;

  // Event listeners after render
  document.querySelectorAll(".location-item").forEach((item) => {
    item.addEventListener("click", () => {
      const location = JSON.parse(item.dataset.location);
      showLocationPopup(location, category, currentTerminal.terminal);
    });
  });

  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const name = btn.dataset.name;
      const location = JSON.parse(
        btn.closest(".location-item").dataset.location,
      );
      handleFavClick(btn, location);
    });
  });
}

// Helper
function handleFavClick(btn, location) {
  const added = toggleFavorite(
    location.name,
    location.image,
    currentTerminal.terminal,
    location,
  );
  btn.classList.toggle("active", added || isFavorite(location.name));
  renderFavorites(); // update top bar instantly
}

// Helper for auto scroll
function scrollToActivity(activityName) {
  const items = [...document.querySelectorAll(".location-item h3")];
  const target = items.find((h3) => h3.textContent.trim() === activityName);
  if (target) {
    const card = target.closest(".location-item");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("highlight");
    setTimeout(() => card.classList.remove("highlight"), 1500);
  } else {
    // if not in current category, find which category it's in and click it
    for (const cat in currentTerminal.categories) {
      if (
        currentTerminal.categories[cat].some((loc) => loc.name === activityName)
      ) {
        document.querySelector(`.pill[data-category="${cat}"]`).click();
        setTimeout(() => scrollToActivity(activityName), 200);
        break;
      }
    }
  }
}
