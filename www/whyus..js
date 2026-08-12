const slider = document.getElementById("features-slider");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const dotsContainer = document.getElementById("slider-dots");
let currentSlide = 0;
let startX = 0;

function setupSlider() {
  if (window.innerWidth >= 900) return; // only run on mobile

  const cards = document.querySelectorAll(".feature-card");
  const totalSlides = cards.length;

  // create dots
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function goToSlide(slide) {
    currentSlide = slide;
    updateSlider();
  }

  nextBtn.onclick = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  };
  prevBtn.onclick = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  };

  // Touch swipe
  slider.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
  slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextBtn.click(); // swipe left
    if (endX - startX > 50) prevBtn.click(); // swipe right
  });
}
setupSlider();
window.addEventListener("resize", setupSlider);
