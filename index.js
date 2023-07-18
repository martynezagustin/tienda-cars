// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

let array = [
  {
    id: 1,
    img: 'https://acnews.blob.core.windows.net/imgnews/medium/NAZ_852c4c2a6c234c6bbad3678960b2f86b.jpg',
    nombre: 'Ford',
    modelo: 'Mustang',
    año: 2009,
    precio: parseFloat(28000),
  },
  {
    id: 2,
    img: 'https://cdn.motor1.com/images/mgl/bgzV2k/s1/2024-chevrolet-corvette-e-ray.jpg',
    nombre: 'Chevrolet',
    modelo: 'Corvette',
    año: 2011,
    precio: parseFloat(22000),
  },
  {
    id: 3,
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/R12TL.JPG',
    nombre: 'Renault',
    modelo: '12',
    año: 1971,
    precio: parseFloat(7000),
  },
  {
    id: 4,
    img: 'https://autotest.com.ar/wp-content/uploads/2022/10/Renault-Sandero-Brasil.jpg',
    nombre: 'Renault',
    modelo: 'Sandero',
    año: 2011,
    precio: parseFloat(7000),
  },
];

let autosCart = [];

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
  appDiv.append(divisor);
});

//add to cart
const botoncito = document.querySelectorAll('.btn-add');
botoncito.forEach((btn) => {
  btn.addEventListener('click', addToCart);
});

const botoncitoCompra = document.querySelectorAll('.btn-purchase');
botoncitoCompra.forEach((btn) => {
  btn.addEventListener('click', purchaseCar);
});

actualizarCart();

function actualizarCart() {
  const spanCart = document.getElementById('cart');
  spanCart.innerHTML = `${autosCart.length}` || [];
}

function addToCart(e) {
  const autoEncontrado = array.find(
    (auto) => auto.id === parseInt(e.target.id)
  );
  const autoExistente = autosCart.some(
    (auto) => auto.id === parseInt(e.target.id)
  );
  if (autoExistente) {
    alert('Cómo vas a agregar un auto dos veces bobo?');
  } else {
    alert(
      autoEncontrado.nombre + ' ' + autoEncontrado.modelo + ' añadido to Cart'
    );
    autosCart.push(autoEncontrado);
  }
  actualizarCart();
}

const divDetalle = document.getElementById('pagina-detail');

function purchaseCar(e) {
  const paginaDetail = document.createElement('div');
  paginaDetail.classList.add('pagina-detalle');
  const autoAComprar = array.find((auto) => auto.id === parseInt(e.target.id));
  paginaDetail.innerHTML = `<div>
  <button class="back">ATRÁS</button>
  </div>
  <img src=${autoAComprar.img}>
  <h1>${autoAComprar.nombre}</h1>
                            <h2>${autoAComprar.modelo}</h2>`;
  divDetalle.append(paginaDetail);
  const botonBack = document.querySelectorAll('.back');
  botonBack.forEach((botoncitoAtrás) => {
    botoncitoAtrás.addEventListener('click', () => {
      appDiv.style.display = 'block';
      paginaDetail.style.display = 'none';
    });
  });
  appDiv.style.display = 'none';
  actualizarCart();
}
