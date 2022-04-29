const elementoPai2 = document.querySelector('.cart__items'); 

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {    
  event.target.remove();
  saveCartItems(elementoPai2.innerHTML);   
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;  
}

const append = async () => {
  const produtos = await fetchProducts('computador');
  const produtoResult = await produtos.results;

  produtoResult.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto;
    const produtoCriado = createProductItemElement({ sku, name, image });
    const elementoPai = document.querySelector('.items');

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
     const { id: sku, title: name, price: salePrice } = produto;
     const cartCriado = createCartItemElement({ sku, name, salePrice });
     elementoPai2.appendChild(cartCriado);
     saveCartItems(elementoPai2.innerHTML);    
    });     
  });   
};

const apagaTudo = () => {
  const buttonLimpar = document.querySelector('.empty-cart');
  
  buttonLimpar.addEventListener('click', () => {
    elementoPai2.innerText = '';
    localStorage.clear();
  });
};

const storage = () => {  
  elementoPai2.innerHTML = getSavedCartItems();

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
};