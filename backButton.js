document.addEventListener("DOMContentLoaded", () => {
  if (window.history.length > 1) {
    const backButton = document.createElement("button");
    backButton.textContent = "← Back";
    backButton.style.position = "fixed";
    backButton.style.top = "20px";
    backButton.style.left = "20px";
    backButton.style.color = "#2563eb";
    backButton.style.background = "none";
    backButton.style.border = "none";
    backButton.style.fontSize = "16px";
    backButton.style.fontWeight = "600";
    backButton.style.cursor = "pointer";
    backButton.style.textDecoration = "underline";
    backButton.addEventListener("click", () => {
      window.history.back();
    });
    document.body.appendChild(backButton);
  }
});
