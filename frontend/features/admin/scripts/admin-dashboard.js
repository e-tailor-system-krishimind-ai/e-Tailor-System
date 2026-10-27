document.querySelectorAll(".sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li")
      .forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});

function logout() {
  localStorage.removeItem("admin");
  window.location.href = new URL("features/landing/pages/newlanding_pg.html", document.baseURI).href;
}

const links = document.querySelectorAll(".sidebar a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.parentElement.classList.add("active");
  }
});
