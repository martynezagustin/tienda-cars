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
    name: 'Ford',
    model: 'Mustang',
    year: 2009,
    description:
      "Un auto para volarse los dientes. 'El Mustang' por su tradicional forma de llamarse es un vehículo de prestigio en el ámbito social.",
    price: parseFloat(28000),
  },
  {
    id: 2,
    img: 'https://cdn.motor1.com/images/mgl/bgzV2k/s1/2024-chevrolet-corvette-e-ray.jpg',
    name: 'Chevrolet',
    model: 'Corvette',
    year: 2011,
    description:
      'Chevrolet Corvette, del año 2011, es hijo del rigor. Desde su salida ha causado buen impacto.',
    price: parseFloat(22000),
  },
  {
    id: 3,
    img: 'https://cdn.motor1.com/images/mgl/Mk3qz6/s1/renault-12-tl-de-1994-en-la-planta-de-santa-isabel-cordoba.-ph-renault-argentina..jpg',
    name: 'Renault',
    model: '12',
    year: 1971,
    description:
      'Renositoooo papá un renault 12 para ser felíz en unas vacaciones en la costa con las reposeras en el baúl.',
    price: parseFloat(7000),
  },
  {
    id: 4,
    img: 'https://cdn.motor1.com/images/mgl/P33GEr/s1/004982_hernandopollicelli_sandero-rs-grapsas.webp',
    name: 'Renault',
    model: 'Sandero',
    year: 2011,
    description:
      'Uf un sanderito como el de la tía es el ideal para viajes de larga distancia. Viaja a Buenos Aires, Tucumán, o La Quiaca con este fenomenal vehículo.',
    price: parseFloat(13000),
  },
  {
    id: 5,
    img: 'https://images7.alphacoders.com/922/thumb-1920-922619.jpg',
    name: 'Ford',
    model: 'Fiesta',
    year: 2017,
    description:
      'El fiestita como el de la madre de Bau es un autazo. Da lujuria, modernidad y simpatía para romper las calles con la pisteada.',
    price: parseFloat(19000),
  },
  {
    id: 6,
    img: 'https://images6.alphacoders.com/490/490703.jpg',
    name: 'Ford',
    model: 'Focus',
    year: 2015,
    description:
      "El Focus autazo papá. Jerarquía, divinidad y trascendencia a las décadas del '10 pibeee que estás esperando.",
    price: parseFloat(16000),
  },
  {
    id: 7,
    img: 'https://s1.1zoom.me/big7/813/Subaru_Impreza_STI_Blue_565047_1920x1080.jpg',
    name: 'Subaru',
    model: 'Impreza',
    year: 2019,
    description:
      'Subaru un autito que siempre fue still underrated en el NFS, pero para mí locura lo que pisa.',
    price: parseFloat(24000),
  },
];

let autosCart = JSON.parse(localStorage.getItem('cars')) || [];
let contentGenerate = false;
const carrito = document.querySelector('.offcanvas-body');
const titleCarrito = document.querySelector('.offcanvas-title');
const divDetalle = document.getElementById('pagina-detail');
//filtrar por categoria
const botonFilter = document.querySelectorAll('.button-filter');
//add to cart
const botoncito = document.querySelectorAll('.btn-add');
//boton de compra
const botoncitoCompra = document.querySelectorAll('.btn-purchase');
//boton de filtrar todas
const botonGenerarTodas = document.getElementById('btn-generar-todas');
//span de total carrito
const spanTotalCart = document.querySelector('.cart-img-total-products');
const containerBtnFilter = document.querySelector('.container-button-filter');

const generarAllCategories = () => {
  clear();
  array.forEach((auto) => {
    const divisor = document.createElement('div');
    divisor.classList.add('divisor');
    divisor.innerHTML = `
    <img src=${auto.img} alt=${auto.model} class="img-car">
    <h2>${auto.name} ${auto.model}</h2>
    <h3>Year: ${auto.year}</h3>
    <h4>U$D ${auto.price}</h4>
    <button id=${auto.id} class="btn-purchase"> PURCHASE NOW 🛍</button>
    <button id=${auto.id} class="btn-add"> ADD TO CART 🛒</button> 
    `;
    pagInicial.appendChild(divisor);
  });
  generateEventsAdd();
  generarEventosPurchase();
};

function generarPorCategory(categoryName) {
  clear();
  const categoryFilter = array.filter((cars) => cars.name == categoryName);
  if (categoryFilter.length > 0) {
    categoryFilter.forEach((car) => {
      const divisor = document.createElement('div');
      divisor.classList.add('divisor');
      divisor.innerHTML = `
        <img src=${car.img} alt=${car.model} class="img-car">
        <h2>${car.name} ${car.model}</h2>
        <h3>Year: ${car.year}</h3>
        <h4>U$D ${car.price}</h4>
        <button id=${car.id} class="btn-purchase"> PURCHASE NOW 🛍</button>
        <button id=${car.id} class="btn-add"> ADD TO CART 🛒</button> 
        `;
      pagInicial.appendChild(divisor);
    });
  }
  contentGenerate = true;
  generateEventsAdd();
  generarEventosPurchase();
}

const clear = () => {
  while (pagInicial.firstChild) {
    pagInicial.removeChild(pagInicial.firstChild);
  }
};

const generateEventsAdd = () => {
  const buttonsAdd = document.querySelectorAll('.btn-add');
  buttonsAdd.forEach((btn) => {
    btn.removeEventListener('click', addToCart);
    btn.addEventListener('click', addToCart);
  });
};

const generarEventosPurchase = () => {
  const btnPurchase = document.querySelectorAll('.btn-purchase');
  btnPurchase.forEach((btn) => {
    btn.removeEventListener('click', purchaseCar);
    btn.addEventListener('click', purchaseCar);
  });
};

function categoriasBoton() {
  const categories = array.map((car) => car.name);
  const categoriesData = [...new Set(categories)];
  categoriesData.forEach((categoryName) => {
    //se le pasan 2 parámetros, filtro e index
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.classList.add('dropdown-item');
    anchor.classList.add('button-filter');
    li.appendChild(anchor);
    anchor.innerText = categoryName;
    containerBtnFilter.appendChild(anchor);
    anchor.addEventListener('click', () => {
      generarPorCategory(categoryName);
      contentGenerate = true;
    });
  });
}

botoncito.forEach((btn) => {
  btn.addEventListener('click', addToCart);
});

botoncitoCompra.forEach((btn) => {
  btn.addEventListener('click', purchaseCar);
});

botonGenerarTodas.addEventListener('click', () => {
  generarAllCategories();
  contentGenerate = true;
});

function addToCart(e) {
  const carFound = array.find((car) => car.id === parseInt(e.target.id));
  let carExist = autosCart.find((auto) => auto.id === parseInt(e.target.id));
  if (carExist) {
    carExist.quantity++;
    Toastify({
      text: 'Increased quantity 😁🤝🏻',
      style: {
        background: 'crimson',
      },
      duration: 2000,
    }).showToast();
    update();
  } else {
    Toastify({
      text: carFound.name + ' ' + carFound.model + ' added to cart 🚘',
      style: {
        background: 'green',
      },
    }).showToast();
    autosCart.push({
      ...carFound,
      quantity: 1,
    });
    localStorage.setItem('cars', JSON.stringify(autosCart));
    update();
  }
}

function purchaseCar(e) {
  const paginaDetail = document.createElement('div');
  paginaDetail.classList.add('pagina-detalle');
  const carToBuy = array.find((car) => car.id === parseInt(e.target.id));
  paginaDetail.innerHTML = `<div>
      <button class="back">&#8592 BACK </button>
      </div>
      <img src=${carToBuy.img}>
      <h1>${carToBuy.name}</h1>
      <h2>${carToBuy.model}</h2>
      <p>${carToBuy.description}</p>
      <div class="btn-product-detail-div">
      <button class="btn-product-detail-contact"> CONTACT ME WITH THE SELLER </button>
      <button class="btn-product-detail-add-to-cart" id=${carToBuy.id}> ADD TO CART </button>
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

function update() {
  carrito.innerHTML = '';
  titleCarrito.innerHTML = `Carrito de productos (${autosCart.length})`;
  if (autosCart.length === 0) {
    carrito.innerHTML = `<p>Aún no cuentas con ningún auto añadido al carrito.</p>`;
  } else {
    //boton de vaciar carrito
    const btnEmpty = document.createElement('button');
    //div del total
    const totalPurchaseP = document.createElement('div');
    totalPurchaseP.classList.add('mt-2');
    const totalPurchase = autosCart.reduce(
      (total, auto) => (total += auto.quantity * auto.price),
      0
    );
    totalPurchaseP.innerText = 'Total a pagar: U$D ' + totalPurchase;
    btnEmpty.textContent = 'VACIAR CARRITO';
    btnEmpty.classList.add('btn-danger');
    btnEmpty.classList.add('btn');
    btnEmpty.classList.add('mt-4');
    btnEmpty.addEventListener('click', vaciarCarrito);
    autosCart.forEach((auto) => {
      const card = document.createElement('div');
      card.classList.add('card-carrito');
      card.innerHTML = ` <img src=${auto.img} class="imagen-auto-cart">
      <p>${auto.name}</p>
      <p><u>Precio:</u> USD ${auto.price} </p>
      <p><u>Descripción:</u> <b>${auto.description}</b></p>
      <div class="d-flex align-items-center container-button-quantity">
      <button class="btn-decrease-quantity" data-id=${auto.id}>-</button>
      <span class="p-1">${auto.quantity}</span>
      <button class="btn-increment-quantity" data-id=${auto.id}>+</button>
      </div>
      <p>Total: USD ${auto.price * auto.quantity}</p>
      <button class="btn-delete-car btn btn-danger" data-id=${
        auto.id
      }> ELIMINAR </button>
      `;
      carrito.append(card);
      const botonEliminar = document.querySelectorAll('.btn-delete-car');
      botonEliminar.forEach((botoncito) => {
        botoncito.addEventListener('click', eliminarAuto);
      });
      const buttonDecreaseQuantity = document.querySelectorAll(
        '.btn-decrease-quantity'
      );
      buttonDecreaseQuantity.forEach((btn) => {
        btn.addEventListener('click', decreaseQuantity);
      });
      const buttonIncrementQuantity = document.querySelectorAll(
        '.btn-increment-quantity'
      );
      buttonIncrementQuantity.forEach((btn) => {
        btn.addEventListener('click', incrementQuantity);
      });
    });
    carrito.appendChild(btnEmpty);
    carrito.appendChild(totalPurchaseP);
    localStorage.setItem('cars', JSON.stringify(autosCart));
  }
  spanTotalCart.innerHTML = `${autosCart.length}`;
}

function eliminarAuto(e) {
  const carFound = autosCart.find(
    (autito) => autito.id === parseInt(e.target.dataset.id)
  );
  const index = autosCart.indexOf(carFound);
  autosCart.splice(index, 1);
  let confirmar = confirm('Deseas remover este auto?');
  if (confirmar) {
    alert('Eliminado con éxito');
    update();
    localStorage.setItem('cars', JSON.stringify(autosCart));
  }
}

function vaciarCarrito() {
  let confirmar = confirm('Desea eliminar todo su carrito?');
  if (confirmar) {
    autosCart.splice(0, autosCart.length);
    alert('Carrito eliminado con éxito.');
    update();
    localStorage.setItem('cars', JSON.stringify(autosCart));
  }
}

function decreaseQuantity(e) {
  const autoDecrease = autosCart.find(
    (auto) => auto.id === parseInt(e.target.dataset.id)
  );
  if (autoDecrease.quantity > 1) {
    autoDecrease.quantity--;
    update();
    localStorage.setItem('cars', JSON.stringify(autosCart));
  }
}

function incrementQuantity(e) {
  const autoIncrement = autosCart.find(
    (auto) => auto.id === parseInt(e.target.dataset.id)
  );
  if (autoIncrement) {
    autoIncrement.quantity++;
    update();
    localStorage.setItem('cars', JSON.stringify(autosCart));
  }
}

update();
categoriasBoton();
generarAllCategories();
