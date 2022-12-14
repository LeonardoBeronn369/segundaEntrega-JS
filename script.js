const productos = [
    {
        nombre: "Jeans Gastado",
        precio: 9000,
        id: 1,
        imagen: 'img/jeans2.jpg'
    },
    {
        nombre: "Sweater Amarillo",
        precio: 6000,
        id: 2,
        imagen: 'img/sweater.jpg'
    },
    {
        nombre: "Sweater Azul",
        precio: 4800,
        id:3,
        imagen: 'img/sweater3.jpg'
    },
    {
        nombre: "Polera Blanca",
        precio: 7000,
        id: 4,
        imagen: 'img/sweater4.jpg'
    },
    {
        nombre: "Polera Amarilla",
        precio: 6500,
        id: 5,
        imagen: 'img/sweater6.jpg'
    },
    {
        nombre: "Jeans Celeste",
        precio: 7500,
        id: 6,
        imagen: 'img/jeans3.jpg'
    }
];

const containerDiv = document.querySelector(".container");
const carritoDiv = document.querySelector(".carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function crearCards() {
    productos.forEach((prod) => {
        containerDiv.innerHTML += `<div class="tarjeta col-lg-4 col-md-4 cold-sm-6 col-xs-12 mb-4">
        <img class="imagenCard" src="${prod.imagen}" alt="">
        <h4>${prod.nombre}</h4>
        <p>$${prod.precio}</p>
        <button id="btn-agregar${prod.id}">Agregar</button>
        </div>
        `
    });
    agregarFuncion();
}

function agregarFuncion() {
    productos.forEach((prod) => {
        document
        .querySelector(`#btn-agregar${prod.id}`)
        .addEventListener("click", () => {
            console.log(prod);
            agregarAlCarrito(prod);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se agrego al Carrito',
                showConfirmButton: false,
                timer: 900,
                toast: true
              })
        })
    })
}


function agregarAlCarrito(prod) {
    let existe = carrito.some((productoSome) => productoSome.id === prod.id);
    if (existe === false) {
        prod.cantidad = 1;
        carrito.push(prod);
    } else {
        let prodFind = carrito.find((productoFind) => productoFind.id === prod.id);
        prodFind.cantidad++;
    }
    
    console.log(carrito);
    generarCarrito();
}



function generarCarrito(){
    carritoDiv.innerHTML = "";
    carrito.forEach(prod=>{
        carritoDiv.innerHTML += `<div class="tarj-borrar">
        <h4>${prod.nombre}</h4>
        <p>Cantidad: ${prod.cantidad}</p>
        <button id="btn-borrar${prod.id}">Borrar</button>
        </div>`;
    });
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    borrarProducto();
} 

function borrarProducto() {
    carrito.forEach((prod) => {
      document
        .querySelector(`#btn-borrar${prod.id}`)
        .addEventListener("click", () => {
          carrito = carrito.filter(
            (productoFilter) => productoFilter.id !== prod.id
          );
            generarCarrito();
        });
        
    });
  }

crearCards();
generarCarrito()


//destructuracion
const [prenda1, prenda2, prenda3, prenda4, prenda5, prenda6] = productos;
//console.log(prenda3, prenda5);

//spread operation
const [producto1, producto2, ...restoDePrendas] = productos;
//console.log(producto1, producto2, ...restoDePrendas)




// ----------- FETCH ---------

document.addEventListener('DOMContentLoaded', obtenerDatos);

function obtenerDatos(){
    const url = './productos.json';

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => mostrarHTML(resultado))
}

function mostrarHTML(colecciones) {
    const contenido = document.querySelector('.contenido');

    let html = '';

    colecciones.forEach(coleccion => {
        const {id, nombre, producto, imagen} = coleccion;

        html += `
        <div class="nuevosProd">
        <img class="imgProx" id="${id}" src="${imagen} " alt="">
        <p class="prodNombre">${nombre} </p>
        <p>producto: ${producto} </p>
        </div>
        `;
    });
    contenido.innerHTML = html;
}

