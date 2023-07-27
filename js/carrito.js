const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoCompra = document.querySelector("#carrito-comprado");
const botonVariarCarrito = document.querySelector("#vaciar-carrito");
const totalProductos = document.querySelector("#total");
const botonComprar = document.querySelector("#comprar-carrito");

let productosEnCarrito = obtenerProductosDelCarrito();

function obtenerProductosDelCarrito() {
  const productosEnCarritoJSON = localStorage.getItem("productos-en-carrito");
  return productosEnCarritoJSON ? JSON.parse(productosEnCarritoJSON) : [];
}

function guardarProductosEnCarrito() {
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function cargarProductosCarrito() {
  if (productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("display");
    contenedorCarritoProductos.classList.remove("display");
    contenedorCarritoAcciones.classList.remove("display");
    contenedorCarritoCompra.classList.add("display");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto-carrito");
      div.innerHTML = `
        <img class="img-producto-carrito" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="nombre-producto">
          <p>Titulo</p>
          <h3>${producto.titulo}</h3>
        </div>
        <div class="cantidad-producto">
          <p>Cantidad</p>
          <small>${producto.cantidad}</small>
        </div>
        <div class="precio-producto">
          <p>Precio</p>
          <small>${producto.precio}</small>
        </div>
        <div class="subtotal">
          <p>Subtotal</p>
          <small>${producto.precio * producto.cantidad}</small>
        </div>
        <button class="eliminar-producto" id="${producto.id}"><i class="bi bi-trash3"></i></button>
      `;

      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("display");
    contenedorCarritoProductos.classList.add("display");
    contenedorCarritoAcciones.classList.add("display");
    contenedorCarritoCompra.classList.add("display");
  }

  actualizarBotonEliminar();
  actualizarTotalCarrito();
}

cargarProductosCarrito();

function actualizarBotonEliminar() {
  const botonesEliminar = document.querySelectorAll(".eliminar-producto");

  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== idBoton);
  guardarProductosEnCarrito();
  cargarProductosCarrito();
}

botonVariarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  productosEnCarrito = [];
  guardarProductosEnCarrito();
  cargarProductosCarrito();
}

function actualizarTotalCarrito() {
  const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  totalProductos.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  productosEnCarrito = [];
  guardarProductosEnCarrito();

  contenedorCarritoVacio.classList.add("display");
  contenedorCarritoProductos.classList.add("display");
  contenedorCarritoAcciones.classList.add("display");
  contenedorCarritoCompra.classList.remove("display");
}