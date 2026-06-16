const API = "http://localhost:5000/api";

document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("user", JSON.stringify(data.user));

  window.location.href = "landing-dashboard.html";
});
