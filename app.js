  const contenedorProductos = document.querySelector("#contenedor-productos");
  const URL_PRODUCTOS = "./productos.json";
  let productos = [];
  
  const cargarProductos = async () => {
    try {
      const response = await fetch(URL_PRODUCTOS);
      productos = await response.json();
  
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
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };
  
  cargarProductos();

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

     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500,
      toast: true, 
      //Estilos
      background: '#a67352e7',
      iconColor: 'brown',
      titleColor: '#000000',
    });
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
  comprarButton.addEventListener("click", mostrarFormulario);


  const simularPagoAPI = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = Math.random() < 0.7;
  
        if (exito) {
          resolve();
        } else {
          reject("Error en el pago");
        }
      }, 2000);
    });
  };

  function mostrarFormulario() {

    if (carrito.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Tu carrito está vacío',
        text: 'Agrega productos antes de realizar una compra',
        showConfirmButton: false,
        timer: 3000,
        //Estilos
        background: '#a67352e7',
        iconColor: 'brown',
        titleColor: '#000000',
      }).then(() => {
        // Redirigir al usuario a la sección de productos
        window.location.href = '#contenedor-productos';
      });
      return;
    }
  
    comprarButton.style.display = "none";
    vaciarCarritoButton.style.display = "none";

    const formulario = document.createElement("form");
    formulario.innerHTML = `
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre y Apellido</label>
        <input type="text" class="form-control" id="nombre" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" required>
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección de envío</label>
        <input type="text" class="form-control" id="direccion" required>
      </div>
      <button type="submit" class="btn producto-agregar">Enviar</button>
    `;
  
    const contenedorFormulario = document.querySelector("#contenedor-carrito");
    contenedorFormulario.innerHTML = "";
    contenedorFormulario.appendChild(formulario);
  
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();
      const nombre = document.querySelector("#nombre").value;
      const email = document.querySelector("#email").value;
      const direccion = document.querySelector("#direccion").value;
  
      Swal.fire({
        title: '¿Deseas confirmar la compra?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
        icon: 'question',
        customClass: {
          confirmButton: 'my-swal-confirm-button-class',
          denyButton: 'my-swal-deny-button-class',
          cancelButton: 'my-swal-cancel-button-class',
        },
        background: '#a67352e7',
        iconColor: 'brown',
        titleColor: '#000000',
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          simularPagoAPI()
            .then(() => {
              Swal.fire({
                title: `Gracias ${nombre} por tu compra`,
                text: `Dentro de las 72hs tu pedido será entregado en ${direccion}`,
                icon: 'success',
                //Estilos
                background: '#a67352e7',
                iconColor: 'brown',
                titleColor: '#000000',
              });
              vaciarCarrito();
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error en el pago',
                text: error,
                icon: 'error',
                //Estilos
                background: '#a67352e7',
                iconColor: 'brown',
                titleColor: '#000000',
              });
            });
        } else if (result.isDenied) {
          Swal.fire({
            title: 'Compra cancelada',
            icon: 'error',
            //Estilos
            customClass: {
              confirmButton: 'my-swal-confirm-button-class',
             },
            background: '#a67352e7',
            iconColor: 'brown',
            titleColor: '#000000',
            buttonsStyling: false,
          });
        }
      });
    });
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