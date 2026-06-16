/* =========================
   CHECK LOGIN
========================= */

const userData = JSON.parse(localStorage.getItem("user"));

if (!userData) {
  window.location.href = "flip-auth.html";
}

/* Username */
const userName = userData.name || "Guest";

document.getElementById("userName").innerText = userName;


/* =========================
   FETCH USER ORDERS
========================= */

const API = "http://localhost:5000/orders";

fetch(API)

.then(res => res.json())

.then(data => {

  // Filter only logged user orders
  const userOrders = data.filter(o => o.client === userName);

  let total = userOrders.length;
  let pending = 0;
  let completed = 0;
  let cost = 0;
  let coins = 0;

  userOrders.forEach(o => {

    if (o.status === "Pending") pending++;
    if (o.status === "Completed") completed++;

    cost += o.price || 500; // default price
    coins += 10;

  });


  /* Update UI */

  document.getElementById("totalOrders").innerText = total;
  document.getElementById("pendingOrders").innerText = pending;
  document.getElementById("completedOrders").innerText = completed;
  document.getElementById("totalCost").innerText = cost;
  document.getElementById("coinCount").innerText = coins;

})

.catch(err => {
  console.error("API Error:", err);
});
