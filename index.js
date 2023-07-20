// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
const pagInicial = document.querySelector('.pagina-inicial');
appDiv.appendChild(pagInicial);

let array = [
  {
    id: 1,
    img: 'https://acnews.blob.core.windows.net/imgnews/medium/NAZ_852c4c2a6c234c6bbad3678960b2f86b.jpg',
    nombre: 'Ford',
    modelo: 'Mustang',
    año: 2009,
    descripcion:
      "Un auto para volarse los dientes. 'El Mustang' por su tradicional forma de llamarse es un vehículo de prestigio en el ámbito social.",
    precio: parseFloat(28000),
  },
  {
    id: 2,
    img: 'https://cdn.motor1.com/images/mgl/bgzV2k/s1/2024-chevrolet-corvette-e-ray.jpg',
    nombre: 'Chevrolet',
    modelo: 'Corvette',
    año: 2011,
    descripcion:
      'Chevrolet Corvette, del año 2011, es hijo del rigor. Desde su salida ha causado buen impacto.',
    precio: parseFloat(22000),
  },
  {
    id: 3,
    img: 'https://fotos.perfil.com/2023/02/19/trim/1280/720/renault-12-1512623.jpg',
    nombre: 'Renault',
    modelo: '12',
    año: 1971,
    descripcion:
      'Renositoooo papá un renault 12 para ser felíz en unas vacaciones en la costa con las reposeras en el baúl.',
    precio: parseFloat(7000),
  },
  {
    id: 4,
    img: 'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/03/renault-sandero-2645095.jpg?tf=3840x',
    nombre: 'Renault',
    modelo: 'Sandero',
    año: 2011,
    descripcion:
      'Uf un sanderito como el de la tía es el ideal para viajes de larga distancia. Viaja a Buenos Aires, Tucumán, o La Quiaca con este fenomenal vehículo.',
    precio: parseFloat(7000),
  },
];

let autosCart = [];

generarAutos();

function generarAutos() {
  array.forEach((auto) => {
    const divisor = document.createElement('div');
    divisor.classList.add('divisor');
    divisor.innerHTML = `
    <img src=${auto.img} alt=${auto.nombre} class="img-car">
    <h2>${auto.nombre} ${auto.modelo}</h2>
    <h3>Año: ${auto.año}</h3>
    <h4>U$D ${auto.precio}</h4>
    <button id=${auto.id} class="btn-purchase"> PURCHASE NOW </button>
    <button id=${auto.id} class="btn-add"> ADD TO CART 🛒</button> 
    `;
    pagInicial.appendChild(divisor);
  });
}

//add to cart
const botoncito = document.querySelectorAll('.btn-add');
botoncito.forEach((btn) => {
  btn.addEventListener('click', addToCart);
});

const botoncitoCompra = document.querySelectorAll('.btn-purchase');
botoncitoCompra.forEach((btn) => {
  btn.addEventListener('click', purchaseCar);
});

function addToCart(e) {
  const autoEncontrado = array.find(
    (auto) => auto.id === parseInt(e.target.id)
  );
  const autoExistente = autosCart.some(
    (auto) => auto.id === parseInt(e.target.id)
  );
  if (autoExistente) {
    Toastify({
      text: '¿Cómo vas a agregar un auto dos veces bobo?',
      style: {
        background: 'red',
      },
      duration: 2000,
    }).showToast();
  } else {
    Toastify({
      text:
        autoEncontrado.nombre +
        ' ' +
        autoEncontrado.modelo +
        ' añadido al carrito 🚘',
      style: {
        background: 'green',
      },
    }).showToast();
    autosCart.push(autoEncontrado);
    actualizar();
  }
}

const divDetalle = document.getElementById('pagina-detail');

function purchaseCar(e) {
  const paginaDetail = document.createElement('div');
  paginaDetail.classList.add('pagina-detalle');
  const autoAComprar = array.find((auto) => auto.id === parseInt(e.target.id));
  paginaDetail.innerHTML = `<div>
  <button class="back">&#8592 BACK </button>
  </div>
  <img src=${autoAComprar.img}>
  <h1>${autoAComprar.nombre}</h1>
                            <h2>${autoAComprar.modelo}</h2>
                            <p>${autoAComprar.descripcion}</p>
                            <div class="btn-product-detail-div">
                            <button class="btn-product-detail-contact"> CONTACTARME CON EL VENDEDOR </button>
                            <button class="btn-product-detail-add-to-cart" id=${autoAComprar.id}> AGREGAR A MI CARRITO </button>
                            </div>
                            `;
  divDetalle.append(paginaDetail);
  const botonBack = document.querySelectorAll('.back');
  botonBack.forEach((botoncitoAtrás) => {
    botoncitoAtrás.addEventListener('click', () => {
      appDiv.style.display = 'block';
      paginaDetail.style.display = 'none';
    });
  });
  const btnAdd = document.querySelectorAll('.btn-product-detail-add-to-cart');
  btnAdd.forEach((botoncito) => {
    botoncito.addEventListener('click', addToCart);
  });
  appDiv.style.display = 'none';
}

const carrito = document.querySelector('.offcanvas-body');
const titleCarrito = document.querySelector('.offcanvas-title');

function actualizar() {
  carrito.innerHTML = '';
  titleCarrito.innerHTML = `Carrito de productos (${autosCart.length})`;
  if (autosCart.length === 0) {
    carrito.innerHTML = `<p>Aún no cuentas con ningún auto añadido al carrito.</p>`;
  } else {
    //boton de vaciar carrito
    const btnEmpty = document.createElement('button');
    btnEmpty.textContent = 'VACIAR CARRITO';
    btnEmpty.classList.add('btn-danger');
    btnEmpty.classList.add('btn');
    btnEmpty.classList.add('mt-4');
    btnEmpty.addEventListener('click', vaciarCarrito);
    autosCart.forEach((auto) => {
      const card = document.createElement('div');
      card.classList.add('card-carrito');
      card.innerHTML = ` <img src=${auto.img} class="imagen-auto-cart">
      <p>${auto.nombre}</p>
      <p><u>Precio:</u> ${auto.precio} USD</p>
      <p><u>Descripción:</u> <b>${auto.descripcion}</b></p>
      <button class="btn-delete-car btn btn-danger" data-id=${auto.id}> ELIMINAR </button>
      `;
      carrito.append(card);
      const botonEliminar = document.querySelectorAll('.btn-delete-car');
      botonEliminar.forEach((botoncito) => {
        botoncito.addEventListener('click', eliminarAuto);
      });
    });
    carrito.appendChild(btnEmpty);
  }
}

function eliminarAuto(e) {
  const autoEncontrado = autosCart.find(
    (autito) => autito.id === parseInt(e.target.dataset.id)
  );
  const index = autosCart.indexOf(autoEncontrado);
  autosCart.splice(index, 1);
  let confirmar = confirm('Deseas remover este auto?');
  if (confirmar) {
    alert('Eliminado con éxito');
    actualizar();
  }
}

function vaciarCarrito() {
  let confirmar = confirm('Desea eliminar todo su carrito?');
  if (confirmar) {
    autosCart.splice(0, autosCart.length);
    alert('Carrito eliminado con éxito.');
    actualizar();
  }
}

actualizar();
