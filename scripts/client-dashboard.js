const user = getLoggedInUser();

if (user) {
  const userName = document.getElementById("userName");
  if (userName) {
    userName.innerText = user.name;
  }

  fetch(`http://localhost:5000/api/dashboard/${user.id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalOrders").innerText = data.stats.totalOrders;
      document.getElementById("activeOrders").innerText = data.stats.activeOrders;
      document.getElementById("completedOrders").innerText = data.stats.completedOrders;
      document.getElementById("measurementsSaved").innerText = data.stats.measurementsSaved;

      const table = document.getElementById("ordersTable");
      table.innerHTML = "";

      if (data.recentOrders.length === 0) {
        table.innerHTML = '<tr><td colspan="5" class="text-center">No orders yet</td></tr>';
      }

      data.recentOrders.forEach(order => {
        table.innerHTML += `
          <tr>
            <td>#${order.orderId}</td>
            <td>${order.cloth}</td>
            <td>${order.status}</td>
            <td>${order.delivery}</td>
            <td>
              <a href="view-order.html?orderId=${order.orderId}" class="btn btn-warning btn-sm">View</a>
            </td>
          </tr>
        `;
      });
    })
    .catch(err => {
      console.error("Dashboard error:", err);
    });
}
