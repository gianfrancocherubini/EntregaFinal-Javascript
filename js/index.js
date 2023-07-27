// Utilizamos async/await para hacer el fetch y obtener los datos de productos
async function obtenerProductos() {
    try {
      const response = await fetch("./js/productos.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
}
  
// Función para crear el HTML de un producto
function crearProductoHTML(producto) {
    return `
      <div class="producto">
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
          <h3 class="producto-titulo">${producto.titulo}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" data-id="${producto.id}">AGREGAR</button>
        </div>
      </div>
    `;
}
  
// Función para mostrar todos los productos en el contenedor
async function mostrarTodosLosProductos() {
    const contenedorProductos = document.querySelector("#contenedor-productos");
    const productos = await obtenerProductos();
    
    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.innerHTML = crearProductoHTML(producto);
      contenedorProductos.appendChild(div);
    });
  
    // Actualizamos los botones de agregar al carrito
    actualizarBotonesAgregar(productos);
  
    // Actualizamos el número del carrito cuando los productos se cargan desde el LocalStorage
    actualizarNumerito();
}
  
// Función para actualizar los botones de agregar al carrito
function actualizarBotonesAgregar(productos) {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", () => agregarAlCarrito(boton.dataset.id, productos));
    });
}
  
let productosEnCarrito = [];
const numerito = document.querySelector("#numerito");
  
// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto, productos) {
    const productoAgregado = productos.find((producto) => producto.id === idProducto);
  
    if (productosEnCarrito.some((producto) => producto.id === idProducto)) {
      const productoEnCarrito = productosEnCarrito.find((producto) => producto.id === idProducto);
      productoEnCarrito.cantidad++;
    } else {
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado);
    }
  
    actualizarNumerito();
    guardarProductosEnLocalStorage();
    mostrarToast("Agregaste un producto al carrito");
}
  
// Función para actualizar el número en el carrito
function actualizarNumerito() {
    const nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
  
// Función para guardar los productos en el LocalStorage
  function guardarProductosEnLocalStorage() {
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
  
// Función para mostrar un toast
function mostrarToast(mensaje) {
    Toastify({
      text: mensaje,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        borderRadius: "2rem",
      },
      onClick: function () {},
    }).showToast();
}
  
// Llamamos a la función para mostrar todos los productos al cargar la página
mostrarTodosLosProductos();