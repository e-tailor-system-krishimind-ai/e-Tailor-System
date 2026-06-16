function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "flip-auth.html";
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "newlanding_pg.html";
}
