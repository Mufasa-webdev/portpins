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

  // FIX 1: Build share url using current domain so it works on localhost + vercel
  const slug = encodeURIComponent(
    location.name.replace(/\s+/g, "-").toLowerCase(),
  );
  const shareUrl = `${window.location.origin}/${terminal}/location/${slug}`;
  const shareText = `Check out ${location.name} on PortPins 🚢`;

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

          <!-- SHARE BUTTONS -->
          <div class="p-share">
            <p class="p-share-title">Share this</p>
            <div class="p-share-buttons">
              <button class="p-share-btn" data-share="native"><i class="fas fa-share-alt"></i> Share</button>
              <button class="p-share-btn" data-share="whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</button>
              <button class="p-share-btn" data-share="copy"><i class="fas fa-link"></i> Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", popupHtml);
  const popup = document.body.lastElementChild;

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

  // HEART LOGIC
  const favBtn = popup.querySelector(".popup-fav-btn");
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const loc = JSON.parse(popup.dataset.location);
    const term = popup.dataset.terminal;
    const added = toggleFavorite(loc.name, loc.image, term, loc);
    favBtn.classList.toggle("active", added || isFavorite(loc.name));
    renderFavorites();
    const cardBtn = document.querySelector(
      `.location-item[data-name="${loc.name}"].fav-btn`,
    );
    if (cardBtn)
      cardBtn.classList.toggle("active", added || isFavorite(loc.name));
  });

  // FIX 2: SHARE LOGIC - works on http and https
  function fallbackCopy(text, btn) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showCopied(btn));
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showCopied(btn);
    }
  }
  function showCopied(btn) {
    const original = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-check"></i> Copied`;
    setTimeout(() => {
      btn.innerHTML = original;
    }, 2000);
  }

  popup.querySelectorAll(".p-share-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation(); // prevents popup from closing
      const type = btn.dataset.share;
      const fullMessage = `${shareText} ${shareUrl}`;

      if (type === "native") {
        if (navigator.share && window.isSecureContext) {
          try {
            await navigator.share({
              title: location.name,
              text: shareText,
              url: shareUrl,
            });
          } catch {}
        } else {
          fallbackCopy(shareUrl, btn);
          alert("Native share not available on http. Link copied instead.");
        }
      } else if (type === "whatsapp") {
        const waUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } else if (type === "copy") {
        fallbackCopy(shareUrl, btn);
      }
    });
  });
}
