const getSavedCartItems = () => {
  const elementoPai2 = document.querySelector('.cart__items');
  elementoPai2.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
