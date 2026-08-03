document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const terminalName = urlParams.get("terminal");
  const terminal = ports.find((port) => port.terminal === terminalName);
  if (terminal) {
    document.getElementById("terminal-name").textContent = terminal.terminal;
    const locationsContainer = document.querySelector(".locations-container");
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
    }, 5000);
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
    categories.forEach((category) => {
      const pill = document.createElement("div");
      pill.classList.add("pill");
      pill.setAttribute("data-category", category);
      let iconClass;
      if (category === "Eat") iconClass = "utensils";
      else if (category === "Shop") iconClass = "shopping-bag";
      else if (category === "Tips") iconClass = "lightbulb";
      else if (category === "Hotels") iconClass = "bed";
      else if (category === "Transfers") iconClass = "car";
      else if (category === "Tours") iconClass = "map";
      else iconClass = "map-marker-alt";
      pill.innerHTML = `
        <i class="fas fa-${iconClass}"></i>
        <span>${category}</span>
        <span class="count">(${terminal.categories[category].length})</span>
      `;
      pill.addEventListener("click", () => {
        showLocations(
          category,
          terminal.categories[category],
          locationsContainer,
        );
      });
      categoryPillsContainer.appendChild(pill);
    });
  }
});

function showLocations(category, locations, locationsContainer) {
  if (category === "Tips") {
    locationsContainer.innerHTML = locations
      .map(
        (hack) => `
      <div class="hack-item">
        <i class="${hack.icon}"></i>
        <div>
          ${Array.isArray(hack.description) ? hack.description.map((desc) => `<p>${desc}</p>`).join("") : `<p>${hack.description}</p>`}
        </div>
      </div>
    `,
      )
      .join("");
  } else {
    locationsContainer.innerHTML = `
      <h2>${category}</h2>
      <ul>
        ${locations
          .map(
            (location) => `
          <li class="location-item" data-location='${JSON.stringify(location)}'>
            <div class="location-tag ${location.tag}">${location.tag}</div>
            <img src="${location.image}" alt="${location.name}">
            <div>
              <h3>${location.name}</h3>
              <p>${location.price}</p>
              <p><i class="fas fa-map-marker-alt"></i> ${location.location}</p>
              <ul class="location-sides">
                ${Array.isArray(location.description) ? location.description.map((desc) => `<li>${desc}</li>`).join("") : `<li>${location.description}</li>`}
              </ul>
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
        showLocationPopup(location, category);
      });
    });
  }
}

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
  let ctaButton = "";
  if (category === "Hotels" || category === "Transfers") {
    ctaButton = `<a href="#" class="cta-button">Book</a>`;
  } else if (category === "Eat") {
    ctaButton = `<a href="#" class="cta-button">Contact</a>`;
  } else if (category === "Tours") {
    ctaButton = `<a href="#" class="cta-button">Book Tour</a>`;
  }

  const popupHtml = `
    <div class="popup-overlay">
      <div class="popup-content">
        <h2>${location.name}</h2>
        <div class="popup-slider">
          ${imageHtml}
          <button class="prev-slide"><i class="fas fa-chevron-left"></i></button>
          <button class="next-slide"><i class="fas fa-chevron-right"></i></button>
        </div>
        <p>${location.description}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${location.location}</p>
        <p><i class="fas fa-star"></i> ${location.rating}</p>
        <div class="sides-container">${sidesHtml}</div>
        ${ctaButton}
        <button class="close-popup">Close</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", popupHtml);

  const slides = document.querySelectorAll(".popup-slide");
  let currentIndex = 0;
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateActiveSlide();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateActiveSlide();
  });

  function updateActiveSlide() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  const closeButton = document.querySelector(".close-popup");
  closeButton.addEventListener("click", () => {
    const popupOverlay = document.querySelector(".popup-overlay");
    popupOverlay.remove();
  });
}
