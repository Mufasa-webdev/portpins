document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.querySelector(".profile-icon");
  const userIcon = document.getElementById("user-icon");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.profileImage) {
    userBtn.style.backgroundImage = `url(${user.profileImage})`;
    userBtn.style.backgroundSize = "cover";
    userBtn.style.backgroundPosition = "center";
    userIcon.style.display = "none"; // hide the icon
    userBtn.style.width = "40px";
    userBtn.style.height = "40px";
  }

  userBtn.addEventListener("click", () => {
    if (user) {
      window.location.href = "profile.html"; // user is logged in, go to profile
    } else {
      window.location.href = "login.html"; // user is logged out, go to login
    }
  });
});
