document.addEventListener("DOMContentLoaded", () => {
  console.log("Footer loaded ✅");

  // Example: update year automatically
  const yearSpan = document.querySelector(".footer-bottom p");
  if (yearSpan) {
    yearSpan.innerHTML = `© ${new Date().getFullYear()} Port Explorer. Made with ❤️ for cruisers`;
  }
});
