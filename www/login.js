document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "profile.html";
  } else {
    alert("Invalid email or password!");
  }
});
document.getElementById("guest-btn").addEventListener("click", () => {
  localStorage.removeItem("user"); // Ensure no user is logged in
  window.location.href = "index.html";
});
