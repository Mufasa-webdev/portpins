document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", searchPorts);

    function searchPorts() {
      const searchTerm = searchInput.value.toLowerCase();
      const results = ports.filter((port) => {
        return (
          port.terminal.toLowerCase().includes(searchTerm) ||
          port.location.toLowerCase().includes(searchTerm)
        );
      });
      searchResults.innerHTML = "";
      if (searchTerm !== "") {
        if (results.length > 0) {
          results.forEach((port) => {
            const card = createCard(port);
            searchResults.appendChild(card);
          });
        } else {
          searchResults.innerHTML =
            "<p class='error-message'>Port not found 😔</p>";
        }
      }
    }

    function createCard(port) {
      const card = document.createElement("div");
      card.classList.add("premium-card");
      const image = document.createElement("div");
      image.classList.add("premium-card-image");
      image.innerHTML = `<img src="${port.coverImage}" alt="${port.terminal}">`;
      card.appendChild(image);
      const content = document.createElement("div");
      content.classList.add("premium-card-content");
      content.innerHTML = `
        <h2>${port.terminal}</h2>
        <p>${port.location}</p>
      `;
      card.appendChild(content);
      const button = document.createElement("button");
      button.classList.add("premium-card-button");
      button.textContent = "View More";
      button.addEventListener("click", () => {
        window.location.href = `details.html?terminal=${port.terminal}`;
      });
      content.appendChild(button);
      const icon = document.createElement("div");
      icon.classList.add("port-icon");
      icon.innerHTML = `<i class="${port.details}"></i>`;
      content.appendChild(icon);
      return card;
    }
  } else {
    console.error("Search input or results element not found");
  }

  const guestBtn = document.getElementById("guest-btn");
  if (guestBtn) {
    guestBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }
});
