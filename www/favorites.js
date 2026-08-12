const MAX_FAVORITES = 5;

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function toggleFavorite(name, image, terminal, fullObj) {
  let favs = getFavorites();
  const index = favs.findIndex((f) => f.name === name);

  if (index > -1) {
    favs.splice(index, 1);
    saveFavorites(favs);
    renderFavorites();
    return false; // removed
  } else {
    if (favs.length >= MAX_FAVORITES) {
      alert(`Max ${MAX_FAVORITES} favorites. Remove one first.`);
      return false;
    }
    favs.push({ ...fullObj, terminal }); // store whole location object
    saveFavorites(favs);
    renderFavorites();
    return true; // added
  }
}

function isFavorite(name) {
  return getFavorites().some((f) => f.name === name);
}

function renderFavorites() {
  const container = document.getElementById("favorites-container");
  if (!container) return;
  const favs = getFavorites();
  if (favs.length === 0) {
    container.innerHTML = `<p class="no-favs">Tap the ♡ to add favorites</p>`;
    return;
  }

  container.innerHTML = favs
    .map(
      (fav) => `
    <div class="fav-pin-card" onclick='openFavPopup(${JSON.stringify(fav).replace(/'/g, "&apos;")})'>
      <img src="${fav.image}" alt="${fav.name}">
      <button class="remove-fav" onclick="event.stopPropagation(); toggleFavorite('${fav.name}')">×</button>
      <p>${fav.name}</p>
    </div>
  `,
    )
    .join("");
}

function openFavPopup(fav) {
  showLocationPopup(fav, "Favorites", fav.terminal); // pass full object to popup
}

document.addEventListener("DOMContentLoaded", renderFavorites);
