// PRODUCTOS

const productos = [
    {
        id: "picada-criolla",
        titulo: "Picada Criolla ",
        imagen: "./img/1.jpg",
        categoria: {
            nombre: "Picadas",
            id: "picadas"
        },
        precio: 15000
    },
  
    {
        id: "picada-de-mar",
        titulo: "Picada de Mar ",
        imagen: "./img/2.jpg",
        categoria: {
            nombre: "Picadas",
            id: "picadas"
        },
        precio: 20000
    },
  
    {
        id: "pan-casero",
        titulo: "Pan Casero",
        imagen: "./img/pan y picada.jpg",
        categoria: {
            nombre: "Panes",
            id: "panes"
        },
        precio: 300
    },
  
    {
        id: "plato-cordero",
        titulo: "Plato de Cordero",
        imagen: "./img/Comida Principalpexels-chevanon-photography-323682.jpg",
        categoria: {
            nombre: "Principales",
            id: "principales"
        },
        precio: 5000
    },
  
    {
        id: "picada-vegetariana",
        titulo: "Picada Vegetariana ",
        imagen: "./img/queso y picada.jpg",
        categoria: {
            nombre: "Picadas",
            id: "picadas"
        },
        precio: 10000
    },
  
  
    {
        id: "sushi",
        titulo: "Sushi x15",
        imagen: "./img/sushin cook.jpg",
        categoria: {
            nombre: "Sushi",
            id: "sushi"
        },
        precio: 8000
    },
  
    {
        id: "sable-fr",
        titulo: "Sable de Frutos Rojos",
        imagen: "./img/9.jpg",
        categoria: {
            nombre: "Tortas",
            id: "tortas"
        },
        precio: 7800
    },
  
    {
        id: "cremoso-maracuya",
        titulo: "Cremoso de Maracuya",
        imagen: "./img/7.jpg",
        categoria: {
            nombre: "Tortas",
            id: "tortas"
        },
        precio: 8000
    }
  ]  
  
  const contenedorProductos = document.querySelector("#contenedor-productos");
  
  productos.forEach((producto, indice) => {
   let content = document.createElement("div");
   content.innerHTML = `
     <div class="card" style="width: 18rem;">
       <img src="${producto.imagen}" class="card-img-top producto-imagen" alt="${producto.titulo}">
       <div class="card-body bgc-card">
         <h5 class="card-title">${producto.titulo}</h5>
         <p class="producto-precio">$${producto.precio}</p>
         <button class="producto-agregar" id="${producto.id}" onClick="agregarAlCarrito(${indice})">Agregar</button>
       </div>
     </div>
   `;
   contenedorProductos.appendChild(content);
  });
  
  // Array Carrito Vacio
  let carrito = [];
  
  let contenedorCarrito = document.querySelector("#contenedor-carrito");
  
  const agregarAlCarrito = (indice) => {
   if (productos && productos.length > 0) {
     const producto = productos[indice];
  
  // Buscar si el producto ya está en el carrito
     const productoExistente = carrito.find((p) => p.id === producto.id);
  
     if (productoExistente) {
       productoExistente.cantidad += 1;
     } else {
       carrito.push({ ...producto, cantidad: 1 });
     }
  
     guardarCarritoEnLocalStorage();
     mostrarCarrito();
   }
  };
  
  const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((producto) => producto.id !== id);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  };
  
  const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
  
    carrito.forEach((producto) => {
      const productoCarrito = document.createElement("div");
      productoCarrito.innerHTML = `
        <div class="card mb-3 productoCarrito" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${producto.imagen}" class="img-fluid rounded-start" width="200" height="200" alt="...">
            </div>
            <div class="col-md-8">
              <div class=" card-body d-flex flex-column justify-content-between" style="max-height: 200px; overflow: hidden;">
                <div>
                  <h5 class="card-title" style="margin-bottom: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${producto.titulo}</h5>
                  <p class="card-text mb-1"><small class="text-muted">Precio: $${producto.precio}</small></p>
                  <p class="card-text mb-1"><small class="text-muted">Cantidad: ${producto.cantidad}</small></p>
                  <p class="card-text mb-0"><small class="text-muted">Subtotal: $${producto.precio * producto.cantidad}</small></p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <button class="btn btn-eliminar boton-menu" onClick="eliminarDelCarrito('${producto.id}')"><i class="bi bi-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
  
      contenedorCarrito.appendChild(productoCarrito);
    });
  
    mostrarTotalCompra();
  };
  
  
  const mostrarTotalCompra = () => {
    const totalCompra = document.querySelector("#total");
    const total = carrito.reduce((accum, producto) => accum + producto.precio * producto.cantidad, 0);
    totalCompra.textContent = `${total}`;
  };
  
  const verCarrito = document.querySelector("#cartButton");
  verCarrito.addEventListener("click", abrirCarrito);
  
  function abrirCarrito() {
   const cartContainer = document.querySelector("#cartContainer");
   cartContainer.classList.add("show");
  
   mostrarCarrito();
  }
  
  const closeCartButton = document.querySelector("#closeCartButton");
  closeCartButton.addEventListener("click", cerrarCarrito);
  
  function cerrarCarrito() {
   const cartContainer = document.querySelector("#cartContainer");
   cartContainer.classList.remove("show");
  }
  
  const vaciarCarritoButton = document.querySelector("#vaciarCarritoButton");
  vaciarCarritoButton.addEventListener("click", vaciarCarrito);
  
  function vaciarCarrito() {
   carrito = [];
   guardarCarritoEnLocalStorage();
   mostrarCarrito();
  }
  
  const comprarButton = document.querySelector("#comprarButton");
  comprarButton.addEventListener("click", comprar);
  
  function comprar() {
   //Falta armar la función compra
  }
  
  // LocalStorage
  const guardarCarritoEnLocalStorage = () => {
   localStorage.setItem("carrito", JSON.stringify(carrito));
  };
  
  const obtenerCarritoDeLocalStorage = () => {
   const carritoLocalStorage = localStorage.getItem("carrito");
   if (carritoLocalStorage) {
     carrito = JSON.parse(carritoLocalStorage);
     mostrarCarrito();
   }
  };
  
  obtenerCarritoDeLocalStorage();