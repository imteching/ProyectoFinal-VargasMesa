let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosData = [];

function mostrarProductos() {
  fetch("json/productos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("❌ Error al cargar los productos.");
      }
      return res.json();
    })
    .then((data) => {
      productosData = data;
      renderizarProductos(productosData);

      Swal.fire({
        icon: "success",
        title: "Productos cargados",
        text: "✅ Los productos se han cargado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    })
    .catch((error) => {
      const contenedor = document.getElementById("productos");
      contenedor.innerHTML = `<div class="error">
    ⚠ Ocurrió un problema: ${error.message}
    </div>`;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: `⚠ Ocurrió un problema: ${error.message}`,
      });
    })
    .finally(() => {
      Swal.fire({
        icon: "info",
        title: "Proceso finalizado",
        text: "ℹ La carga de productos ha finalizado.",
        timer: 1500,
        showConfirmButton: false,
      });
    });
}
function renderizarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  if (lista.lenght === 0) {
    contenedor.innerHTML = `
    <div class="no-resultados">
    🚫 No se encontraron productos que coincidan con tu búsqueda.
    </div>
    `;
    return;
  }

  lista.forEach((prod) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio.toLocaleString()}</p>
        <button onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${
      prod.precio
    }, '${prod.imagen}')">Agregar al carrito</button>
        `;
    contenedor.appendChild(card);
  });
}

function agregarAlCarrito(id, nombre, precio, imagen) {
  const productoExistente = carrito.find((item) => item.id === id);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1, imagen });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));

  const mensaje = document.getElementById("mensaje");
  mensaje.innerHTML = `🤞🏻 ${nombre} agregado al carrito`;
  mensaje.style.display = `block`;

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 2000);
}

function aplicarFiltros() {
  const nombreInput = document.getElementById("filtroNombre");
  const precioInput = document.getElementById("filtroPrecio");

  const nombreFiltro =
    nombreInput && nombreInput.value ? nombreInput.value.toLowerCase() : "";
  const precioFiltro =
    precioInput && precioInput.value ? parseFloat(precioInput.value) : NaN;

  let filtrados = productosData.filter((prod) => {
    const coincideNombre = prod.nombre.toLowerCase().includes(nombreFiltro);
    const coincidePrecio = isNaN(precioFiltro) || prod.precio <= precioFiltro;
    return coincideNombre && coincidePrecio;
  });

  renderizarProductos(filtrados);
}

document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("filtroNombre");
  const precioInput = document.getElementById("filtroPrecio");

  if (nombreInput) {
    nombreInput.addEventListener("input", aplicarFiltros);
  }
  if (precioInput) {
    precioInput.addEventListener("input", aplicarFiltros);
  }
  mostrarProductos();
});
