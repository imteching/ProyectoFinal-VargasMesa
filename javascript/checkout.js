document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  const resumenSection = document.getElementById("resumenCompra");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let subtotal = 0;
  resumenSection.innerHTML = "<h2>🛍 Resumen de tu compra</h2>";

  if (carrito.length === 0) {
    resumenSection.innerHTML += "<p>Tu carrito está vacío.</p>";
  } else {
    const lista = document.createElement("ul");

    carrito.forEach((prod) => {
      const item = document.createElement("li");
      const itemSubtotal = prod.precio * prod.cantidad;
      subtotal += itemSubtotal;
      item.textContent = `${prod.nombre} - Cantidad: ${
        prod.cantidad
      } - Subtotal: ${itemSubtotal.toLocaleString()}`;
      lista.appendChild(item);
    });
    resumenSection.appendChild(lista);

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `
    <p>Subtotal: $${subtotal.toLocaleString()}</p>
    <p>IVA (19%): $${iva.toLocaleString()}</p>
    <h3>Total a pagar: $${total.toLocaleString()}</h3>`;
    resumenSection.appendChild(totalDiv);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (carrito.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Tu carrito está vacío",
        text: "Agrega productos antes de finalizar la compra",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "🌸 ¡Gracias por tu compra!",
      html: `Tu pedido ha sido recibido.<br> Total a pagar: <strong>$${(
        subtotal * 1.19
      ).toLocaleString()}</strong>`,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff66b2",
    }).then(() => {
      localStorage.removeItem("carrito");
      window.location.href = "../index.html";
    });
  });
});
