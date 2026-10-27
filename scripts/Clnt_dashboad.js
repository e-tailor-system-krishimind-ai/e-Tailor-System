// Sidebar active state
document.querySelectorAll(".sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li")
      .forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// Username load
const user = localStorage.getItem("username");
if (user) {
  document.getElementById("userName").innerText = user;
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "login_pg.html";
}

// Sidebar active link highlight
const links = document.querySelectorAll(".sidebar a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.parentElement.classList.add("active");
  }
});

// Logout
const logoutBtn = document.querySelector(".user button");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login_pg.html";
  });
}

// Username show
const userName = document.getElementById("userName");
if (userName && localStorage.getItem("username")) {
  userName.innerText = localStorage.getItem("username");
}

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  const username = document.querySelector('input[type="text"]').value;
  localStorage.setItem("username", username);

  window.location.href = "Clnt_dashboad.html";
});


document.querySelectorAll(".sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li")
      .forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});



