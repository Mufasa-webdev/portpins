document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const terminalName = urlParams.get("terminal");
  const terminal = ports.find((port) => port.terminal === terminalName);

  if (terminal) {
    document.getElementById("terminal-name").textContent = terminal.terminal;

    // Create back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.id = "back-button";
    document.body.appendChild(backButton);

    backButton.addEventListener("click", () => {
      window.history.back();
    });

    // Create slider
    const slides = document.querySelector(".slides");
    const pagination = document.querySelector(".pagination");
    terminal.images.forEach((image, index) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.innerHTML = `<img src="${image}" alt="${terminal.terminal}">`;
      slides.appendChild(slide);
      const paginationItem = document.createElement("div");
      paginationItem.classList.add("pagination-item");
      if (index === 0) {
        paginationItem.classList.add("active");
        slide.classList.add("active");
      }
      paginationItem.addEventListener("click", () => {
        updateActiveSlide(index);
      });
      pagination.appendChild(paginationItem);
    });

    // Slider functionality
    const slidesArray = document.querySelectorAll(".slide");
    const paginationItems = document.querySelectorAll(".pagination-item");
    let currentIndex = 0;
    function updateActiveSlide(index) {
      paginationItems.forEach((i) => i.classList.remove("active"));
      paginationItems[index].classList.add("active");
      slidesArray.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
      currentIndex = index;
    }
    paginationItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        updateActiveSlide(index);
      });
    });

    // Swipe gesture support
    let touchStartX = 0;
    let touchEndX = 0;
    slides.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });
    slides.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    });
    function handleSwipe() {
      if (touchStartX - touchEndX > 50) {
        // Swipe left
        if (currentIndex < slidesArray.length - 1) {
          updateActiveSlide(currentIndex + 1);
        } else {
          updateActiveSlide(0);
        }
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right
        if (currentIndex > 0) {
          updateActiveSlide(currentIndex - 1);
        } else {
          updateActiveSlide(slidesArray.length - 1);
        }
      }
    }
    let autoPlayInterval = setInterval(() => {
      if (currentIndex < slidesArray.length - 1) {
        updateActiveSlide(currentIndex + 1);
      } else {
        updateActiveSlide(0);
      }
    }, 5000); // 5-second interval
    slides.addEventListener("touchstart", () => {
      clearInterval(autoPlayInterval);
    });
    paginationItems.forEach((item) => {
      item.addEventListener("click", () => {
        clearInterval(autoPlayInterval);
      });
    });

    // Create category pills and show locations
    const categories = Object.keys(terminal.categories);
    const categoryPillsContainer = document.querySelector(".category-pills");
    const locationsContainer = document.querySelector(".locations-container");
    categories.forEach((category) => {
      const pill = document.createElement("div");
      pill.classList.add("pill");
      pill.setAttribute("data-category", category);
      pill.innerHTML = `
        <i class="fas fa-${category === "Eat" ? "utensils" : category === "Shop" ? "shopping-bag" : "map-marker-alt"}"></i>
        <span>${category}</span>
        <span class="count">(${terminal.categories[category].length})</span>
      `;
      pill.addEventListener("click", () => {
        console.log("Pill clicked:", category);
        showLocations(category, terminal.categories[category]);
      });
      categoryPillsContainer.appendChild(pill);
    });
    function showLocations(category, locations) {
      console.log("Showing locations for:", category);
      console.log("Locations:", locations);
      locationsContainer.innerHTML = `
        <h2>${category}</h2>
        <ul>
          ${locations
            .map(
              (location) => `
            <li class="location-item" data-location='${JSON.stringify(location)}'>
              <img src="${location.image}" alt="${location.name}">
              <div>
                <h3>${location.name}</h3>
                <p>${location.description}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${location.location}</p>
                <p><i class="fas fa-star"></i> ${location.rating}</p>
              </div>
            </li>
          `,
            )
            .join("")}
        </ul>
      `;
      const locationItems = document.querySelectorAll(".location-item");
      locationItems.forEach((item) => {
        item.addEventListener("click", () => {
          const location = JSON.parse(item.dataset.location);
          showLocationPopup(location);
        });
      });
    }
  } else {
    console.error("Terminal not found:", terminalName);
  }
});
