let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");
  const totalElemento = document.getElementById("total");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalElemento.textContent = "";
    return;
  }

  let subtotal = 0;
  carrito.forEach((prod) => {
    subtotal += prod.precio * prod.cantidad;

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio.toLocaleString()}</p>
        <p>Cantidad: ${prod.cantidad}</p>
        <p>Subtotal: $${(prod.precio * prod.cantidad).toLocaleString()}</p>
        <button onclick="eliminarProducto(${prod.id})">Eliminar</button>
        `;
    contenedor.appendChild(card);
  });

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  totalElemento.innerHTML = `
  <p>Subtotal: $${subtotal.toLocaleString()}</p>
  <p>IVA (19%): $${iva.toLocaleString()}</p>
  <h3>Total a pagar: $${total.toLocaleString()}</h3>
  `;
}

function eliminarProducto(id) {
  carrito = carrito.filter((item) => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

mostrarCarrito();
