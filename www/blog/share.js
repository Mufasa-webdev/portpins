document.addEventListener("DOMContentLoaded", () => {
  const pageUrl = window.location.href;
  const pageTitle = document.title;

  const fb = document.querySelector(".share-btn.facebook");
  const tw = document.querySelector(".share-btn.twitter");
  const wa = document.querySelector(".share-btn.whatsapp");
  const copy = document.querySelector(".share-btn.copy");

  if (fb)
    fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  if (tw)
    tw.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
  if (wa)
    wa.href = `https://wa.me/?text=${encodeURIComponent(pageTitle + " - " + pageUrl)}`; // <-- FIXED HERE

  if (copy)
    copy.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(pageUrl);
      const btn = e.target.closest(".share-btn");
      const original = btn.innerHTML;
      btn.innerHTML = "✓";
      setTimeout(() => {
        btn.innerHTML = original;
      }, 1500);
    });
});
