const elementoPai2 = document.querySelector('.cart__items');
/**
 * aqui vai ficar armazenado os produtos escolhidos para ir para o carrinho.
 * apenas os DADOS do produto são armazenados aqui, nada de elementos do html.
 */
 let cartItemsArray = [];

 function removerItemDoCarrinho(sku) {
  cartItemsArray = cartItemsArray.filter((i) => i.sku !== sku);  
  return cartItemsArray;
}

function AdicionarNoCarrinho(produto) {
  cartItemsArray.push(produto);
}

const somaValorTotalDoCart = () => {
  if (cartItemsArray.length) {
    return cartItemsArray
      .map((i) => i.salePrice)
      .reduce((total, current) => total + current);
  }
  return 0;
};

const criarTotalValores = () => {
  const p = document.createElement('p');
  const pai = document.querySelector('.cart');
  const button = document.querySelector('.empty-cart');
  const totalLabel = document.querySelector('.total-price');
  if (!totalLabel) {
    p.setAttribute('class', 'total-price');
    p.innerHTML = somaValorTotalDoCart();
    pai.insertBefore(p, button);
  } else {
    totalLabel.innerHTML = somaValorTotalDoCart();
  }
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function cartItemClickListener(event) {
  event.target.remove();
  // console.log({ target: event.target });
  const newCartItems = removerItemDoCarrinho(String(event.target.innerText).substring(5, 18));
  saveCartItems(newCartItems);
  criarTotalValores();
}

function createCartItemElement({ image, sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(createProductImageElement(image));
  return li;
}

function gerarHTMLdoCarrinho() {
  elementoPai2.innerHTML = '';
  cartItemsArray.forEach((item) => {
    const cartCriado = createCartItemElement({
      image: item.image,
      sku: item.sku,
      name: item.name,
      salePrice: item.salePrice,
    });
    elementoPai2.appendChild(cartCriado);
  });
}

function carregando() {
  const elemento = document.createElement('p');
  elemento.innerText = 'carregando...';
  elemento.setAttribute('class', 'loading');
  
  elementoPai2.appendChild(elemento);
}

function removendo() {
  const loading = document.querySelectorAll('.loading');
  loading.forEach((elemento) => elemento.remove());
}

const append = async () => {
  carregando();
  const produtos = await fetchProducts('computador');
  const produtoResult = await produtos.results;

  produtoResult.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto;
    const produtoCriado = createProductItemElement({ sku, name, image });
    const elementoPai = document.querySelector('.items');
    removendo();
    elementoPai.appendChild(produtoCriado);
  });
};

const appendCarrinho = async () => {    
  const buttons = document.querySelectorAll('.item__add');

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
     const id = button.previousElementSibling
     .previousElementSibling
     .previousElementSibling.innerText;
     const produto = await fetchItem(id);
     const { thumbnail: image, id: sku, title: name, price: salePrice } = produto;
      AdicionarNoCarrinho({ image, sku, name, salePrice });
      saveCartItems(cartItemsArray);
      gerarHTMLdoCarrinho();
      criarTotalValores();
    });
  });
};

const apagaTudo = () => {
  const buttonLimpar = document.querySelector('.empty-cart');
  
  buttonLimpar.addEventListener('click', () => {
    cartItemsArray = [];
    localStorage.clear();
    gerarHTMLdoCarrinho();
    criarTotalValores();
  });
};

const storage = () => {
  cartItemsArray = getSavedCartItems() || [];
  gerarHTMLdoCarrinho();

  const list = document.querySelectorAll('.cart__item');
  list.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
};

window.onload = async () => {
 await append();
 await appendCarrinho();
 apagaTudo();
 storage();
 criarTotalValores();
};