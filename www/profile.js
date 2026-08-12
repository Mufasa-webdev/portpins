document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const nameEl = document.getElementById("user-name");
    const emailEl = document.getElementById("user-email");
    if (nameEl) nameEl.textContent = user.name || "No name";
    if (emailEl) emailEl.textContent = user.email;
    loadUserReviews(user.email);

    if (user.profileImage) {
      const profileImg = document.getElementById("profile-img");
      if (profileImg) profileImg.src = user.profileImage;
    }
  } else {
    console.log("No user found");
  }
});

// Logout button
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
} else {
  console.error("Logout button not found");
}

// Back button
const backButton = document.getElementById("back-button");
if (backButton) {
  backButton.addEventListener("click", () => {
    window.history.back();
  });
}

// Edit profile button
const editBtn = document.getElementById("edit-profile-btn");
if (editBtn) {
  editBtn.addEventListener("click", showEditProfileForm);
}

// Home link
const homeLink = document.getElementById("home-link");
if (homeLink) {
  homeLink.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Edit image
const editImageBtn = document.getElementById("edit-image-btn");
const imageInput = document.getElementById("image-input");
if (editImageBtn) {
  editImageBtn.addEventListener("click", () => {
    if (imageInput) imageInput.click();
  });
}
if (imageInput) {
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("profile-img").src = reader.result;
        const user = JSON.parse(localStorage.getItem("user"));
        user.profileImage = reader.result;
        localStorage.setItem("user", JSON.stringify(user));

        // Update user button image
        const userBtn = document.querySelector(".profile-icon");
        if (userBtn) {
          userBtn.style.backgroundImage = `url(${reader.result})`;
          userBtn.style.backgroundSize = "cover";
          userBtn.style.backgroundPosition = "center";
          userBtn.innerHTML = ""; // remove the icon
        }
      };

      reader.onerror = () => {
        console.error("Error reading file");
        // show error message to user (optional)
      };
      reader.readAsDataURL(file);
    } else {
      // show error message to user (optional)
      console.error("Invalid file type");
    }
  });
}

// Load user reviews
function loadUserReviews(userId) {
  const reviews = [
    {
      business: "Captain Jack's Cafe",
      rating: 4,
      comment: "Great place to grab a coffee!",
    },
    {
      business: "Portside Bistro",
      rating: 5,
      comment: "Amazing food and view!",
    },
  ];
  const reviewList = document.getElementById("review-list");
  if (!reviewList) return;
  reviewList.innerHTML = "";
  reviews.forEach((review) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h4>${review.business}</h4>
      <p>Rating: ${"⭐".repeat(review.rating)}</p>
      <p>${review.comment}</p>
    `;
    reviewList.appendChild(li);
  });
}

// Show edit profile form
function showEditProfileForm() {
  const user = JSON.parse(localStorage.getItem("user"));
  const profileDetails = document.querySelector(".profile-details");
  if (!profileDetails) return;
  profileDetails.innerHTML = `
    <form id="edit-profile-form">
      <label for="name">Name:</label>
      <input type="text" id="name" value="${user.name}" required>
      <label for="avatar">Avatar:</label>
      <input type="file" id="avatar">
      <button type="submit">Save Changes</button>
    </form>
  `;
  document
    .getElementById("edit-profile-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const newName = document.getElementById("name").value;
      user.name = newName;
      localStorage.setItem("user", JSON.stringify(user));
      document.getElementById("user-name").textContent = newName;
      alert("Profile updated!");
    });
}
const userBtn = document.getElementById("user-btn");
if (userBtn) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.profileImage) {
    userBtn.style.backgroundImage = `url(${user.profileImage})`;
    userBtn.innerHTML = ""; // remove the icon text
  } else {
    userBtn.innerHTML = "👤"; // default icon
  }

  userBtn.addEventListener("click", () => {
    if (user) {
      window.location.href = "profile.html";
    } else {
      window.location.href = "login.html";
    }
  });
}
