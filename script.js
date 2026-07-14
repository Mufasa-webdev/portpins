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

//timer
let countdownInterval = null;
let onboardTime = null;

// Request notification permission on load
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "./Media/inner.png" });
  }
}

function toggleTimer() {
  if (countdownInterval) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  const timeInput = document.getElementById("welcomeTimePicker").value;
  if (!timeInput) return alert("Pick a time first");

  onboardTime = timeInput;
  localStorage.setItem("onboardTime", onboardTime);
  localStorage.setItem("timerRunning", "true");

  document.getElementById("timerBtn").textContent = "Stop Timer";
  document.getElementById("timerBtn").style.background = "#ef4444";

  showNotification("Timer Started", `Onboard time set to ${onboardTime}`);
  runCountdown();
}

function stopTimer() {
  clearInterval(countdownInterval);
  countdownInterval = null;
  localStorage.setItem("timerRunning", "false");

  document.getElementById("timerBtn").textContent = "Set Onboard Time";
  document.getElementById("timerBtn").style.background = "#2563eb";
  document.getElementById("timeLeft").textContent = "--:--";
  document.getElementById("countdownBar").className = "";
  document.getElementById("countdownBar").style.background = "#10b981";

  showNotification("Timer Stopped", "Countdown paused");
}

function runCountdown() {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const [h, m] = onboardTime.split(":").map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);

    const now = new Date();
    let diff = Math.floor((target - now) / 1000); // seconds left

    if (diff <= 0) {
      diff = 0;
      stopTimer();
      showNotification("All Aboard!", "It's time to board!");
    }

    const mins = String(Math.floor(diff / 60)).padStart(2, "0");
    const secs = String(diff % 60).padStart(2, "0");
    document.getElementById("timeLeft").textContent = `${mins}:${secs}`;

    // Color bar logic
    const bar = document.getElementById("countdownBar");
    bar.className = "";
    if (diff <= 300) {
      // 5 min
      bar.classList.add("danger");
      if (diff === 300)
        showNotification("5 Minutes Left", "Get ready to board!");
    } else if (diff <= 900) {
      // 15 min
      bar.classList.add("warning");
      if (diff === 900)
        showNotification("15 Minutes Left", "Head to the gate soon");
    }
  }, 1000);
}

// Load saved timer on refresh/offline
window.addEventListener("load", () => {
  const saved = localStorage.getItem("onboardTime");
  const running = localStorage.getItem("timerRunning");
  if (saved) {
    document.getElementById("welcomeTimePicker").value = saved;
    onboardTime = saved;
  }
  if (running === "true") {
    startTimer();
  }
});

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
    const pinCard = document.createElement("div");
    pinCard.classList.add("pin-card");

    const pinCardCover = document.createElement("div");
    pinCardCover.style.backgroundImage = `url(${pin.pinImage})`;
    pinCardCover.classList.add("pincardcoverCss");

    const pincardInfo = document.createElement("div");
    pincardInfo.classList.add("pincardinfo-css");
    pincardInfo.innerHTML = `
    <h2 class="pincardinfo-headertext"> ${pin.name}</h2>
    <p class="pincardinfo-desc">${pin.desc} </p>
    `;

    pinCard.appendChild(pinCardCover);
    pinCard.appendChild(pincardInfo);
    allpinscontainer.appendChild(pinCard);

    pinCard.addEventListener("click", () => {
      pinDescription(pin);
    });
  });

  pinsList.appendChild(allpinscontainer);
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
