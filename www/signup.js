document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email:", email);
  console.log("Password:", password);

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    alert("User already exists!");
    return;
  }

  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup success! Login now.");
  window.location.href = "login.html";
});
document.getElementById("guest-btn").addEventListener("click", () => {
  localStorage.removeItem("user"); // Ensure no user is logged in
  window.location.href = "index.html";
});
const userBtn = document.getElementById("user-btn");
if (userBtn) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.profileImage) {
    userBtn.style.backgroundImage = `url(${user.profileImage})`;
    userBtn.style.backgroundSize = "cover";
    userBtn.style.borderRadius = "50%";
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
