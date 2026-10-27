const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.parentElement.classList.add("active");
  }
});

const userName = document.getElementById("userName");
const storedUserName = localStorage.getItem("username");

if (userName && storedUserName) {
  userName.innerText = storedUserName;
}
