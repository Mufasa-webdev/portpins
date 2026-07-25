function showLocationPopup(location) {
  const colors = ["#FF69B4", "#34A85A", "#FFC107", "#8E24AA", "#4CAF50"];
  const sidesHtml = location.sides
    .map((side, index) => {
      const color = colors[index % colors.length];
      return `<span class="side-pill" style="background-color: ${color};">${side}</span>`;
    })
    .join("");
  const mapUrl = location.map;
  const popupHtml = `
    <div class="popup-overlay">
      <div class="popup-content">
        <h2>${location.name}</h2>
        <img src="${location.image}" alt="${location.name}">
        <p>${location.description}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${location.location}</p>
        <p><i class="fas fa-star"></i> ${location.rating}</p>
        <div class="sides-container">${sidesHtml}</div>
        <a href="${mapUrl}" target="_blank" class="cta-button">Open in Google Maps</a>
        <button class="close-popup">Close</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", popupHtml);
  const closeButton = document.querySelector(".close-popup");
  closeButton.addEventListener("click", () => {
    const popupOverlay = document.querySelector(".popup-overlay");
    popupOverlay.remove();
  });
}
