if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js") // <-- use ./ instead of /
      .then((reg) => console.log("SW registered:", reg))
      .catch((err) => console.log("SW registration failed:", err));
  });
}

let portsData = [];

fetch("ports.json")
  .then((response) => response.json())
  .then((data) => {
    portsData = data.ports;
    loadPorts(); // this calls your function to show pins
  })
  .catch((error) => console.error("Error loading JSON:", error));

function loadPorts() {
  // your code to show pins (use portsData instead of ports)
}

// Listings end here ----------------------------------

const resultsContainer = document.getElementById("resultsContainer");
const searchInput = document.getElementById("searchBar");
searchInput.addEventListener("input", search);
const recentPortsContainer = document.getElementById("recentPortsContainer");
const searchPage = document.getElementById("searchPage");
const portPage = document.getElementById("portPage");
const pillsDiv = document.getElementById("pillsDiv");
const pinsList = document.getElementById("pinsList");
const allpinscontainer = document.getElementById("allpins");
const pinsDescSection = document.getElementById("pinsDesc");
const lightbox = document.getElementById("lightbox");

// variables up here---------------------------------

//functions down here ------------------------------

//pinsdescription page-------

function pinDescription(pin) {
  pinsDescSection.style.display = "block";
  pinsList.style.display = "none";

  const galleria = document.createElement("div");
  galleria.classList.add("galleria");
  pin.gallery.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo;
    img.alt = pin.name;
    img.classList.add("gallery-img");
    img.addEventListener("click", () => openLightbox(photo));
    galleria.appendChild(img);
  });

  const pindescdiv2 = document.createElement("div");
  pindescdiv2.classList.add("pindesc-div2");
  pindescdiv2.innerHTML = ` <h2 class="pinsdesc-headertext"> ${pin.name}</h2>
  <p class="addr">Address: ${pin.addr}</p>
  <p class="addr">Fee: ${pin.fee}</p>
  <button class="cta" >Take me there </button>
  `;
  const takeMeBtn = pindescdiv2.querySelector(".cta");
  takeMeBtn.addEventListener("click", () => {
    if (pin.lat && pin.lng) {
      const url = `https://www.google.com/maps?q=${pin.lat},${pin.lng}`;
      window.open(url, "_blank");
    } else {
      alert("Map coordinates missing!");
    }
  });

  const pindescdiv = document.createElement("div");
  pindescdiv.classList.add("pindesc-div");

  const pindescCover = document.createElement("div");
  pindescCover.classList.add("pindesc-Cover");
  pindescCover.style.backgroundImage = `url(${pin.pinImage})`;
  console.log(pin.pinImage);

  pinsDescSection.appendChild(pindescdiv);
  pindescdiv.appendChild(pindescCover);
  pindescdiv.appendChild(galleria);
  pindescdiv.appendChild(pindescdiv2);
}

// pinsPage------------------------------------
function showPinsPage(category) {
  pinsList.style.display = "block";
  portPage.style.display = "none";
  allpinscontainer.innerHTML = "";

  category.pins.forEach((pin) => {
    const pincardContainer = document.createElement("div");
    pincardContainer.classList.add("pin-card");

    const pincardCover = document.createElement("div");
    pincardCover.classList.add("pincardcoverCss");
    pincardCover.style.backgroundImage = `url(${pin.pinImage})`;

    const pincardInfo = document.createElement("div");
    pincardInfo.classList.add("pincardInfo");
    pincardInfo.innerHTML = `
    <h2 class="pincardheadertext-css">${pin.name}</h2>
    <div class="pincardicon">
    <i class="${pin.dist}"></i> <p class="pincardicontime"> ${pin.time}</p>
    </div>
    <div class="tagbox">
    <button class="pincard-tag" >${pin.tag}</button>
    <button class="pincard-tag2 ">${pin.tag2}</button>
    </div>
    
    `;

    pincardContainer.appendChild(pincardCover);
    pincardContainer.appendChild(pincardInfo);

    allpinscontainer.appendChild(pincardContainer);

    pincardContainer.addEventListener("click", () => {
      pinDescription(pin);
    });

    /*pin.tag.forEach((tagitem) => {
      const tagbox = document.createElement("div");
      tagbox.classList.add("pincard-tag");
      tagbox.innerText = tagitem;

      allpinscontainer.appendChild(tagbox);
    });*/
  });
}

//showPageeee----------------------------------

function showPage(port) {
  searchPage.style.display = "none";
  portPage.style.display = "block";

  const portCard = document.createElement("div");
  portCard.classList.add("port-page");

  const heroDiv = document.createElement("div");
  heroDiv.style.backgroundImage = `url(${port.image})`;
  heroDiv.classList.add("hero-image");

  const labelDiv = document.createElement("div");
  labelDiv.classList.add("label-div");
  labelDiv.innerHTML = `<h2 class="label-header">${port.name}</h2>
  <hr>
  <h2 class="">What are you looking for?</h2>
  `;

  pillsDiv.innerHTML = "";
  port.categories.forEach((category) => {
    const pill = document.createElement("div");

    pill.innerHTML = `
    <div class="pills pills-${category.name.toLowerCase()}">

      <i class="${category.icon}"></i>
    <h2 class="headertext-${category.name.toLowerCase()}"> ${category.name}</h2>
    <span class="pins-${category.name.toLowerCase()}">${category.pins.length} pins</span>
    </div>
     `;

    pillsDiv.appendChild(pill);
    pill.addEventListener("click", () => {
      showPinsPage(category);
    });
  });

  portCard.appendChild(heroDiv);
  portCard.appendChild(labelDiv);
  portCard.appendChild(pillsDiv);

  portPage.appendChild(portCard);
}

let foundAny = false;

function search() {
  const searchInputLower = searchInput.value.toLowerCase();
  resultsContainer.innerHTML = "";

  portsData.forEach(function (port) {
    const portLower = port.name.toLowerCase();

    if (searchInputLower === "") {
      resultsContainer.innerHTML = "";
      return;
    }

    if (portLower.includes(searchInputLower)) {
      foundAny = true;
      const card = document.createElement("div");
      card.classList.add("port-card");

      const bgDiv = document.createElement("div");
      bgDiv.classList.add("port-image");
      bgDiv.style.backgroundImage = `url(${port.image})`;

      const portRegion = document.createElement("p");
      portRegion.classList.add("ship-port");

      const portName = document.createElement("div");
      portName.classList.add("h2", "port-name");
      portName.innerHTML = `<h2>${port.name}</h2>
      <p class= "ship-port">${port.region}</p>`;

      const departText = document.createElement("div");
      departText.classList.add("ship-text", "icon-text", "ship-port", "span");
      departText.innerHTML = `
      <i class="fa-regular fa-clock ship-port"></i>
      <p class="ship-text">Departs <span>${port.departure}</span></p>
      `;

      card.appendChild(bgDiv);
      card.appendChild(portName);
      card.appendChild(portRegion);

      resultsContainer.appendChild(card);

      card.addEventListener("click", () => showPage(port));
    }
  });
}
//lightbox function -------------------------------------
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightbox.style.display = "flex";
  lightboxImg.src = src; // put the clicked image in the big popup
}

// Close when you click outside the image
document.getElementById("lightbox").onclick = (e) => {
  if (e.target.id === "lightbox") {
    document.getElementById("lightbox").style.display = "none";
  }
};
