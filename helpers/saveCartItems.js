const saveCartItems = (conteudo) => localStorage.setItem('cartItems', conteudo);  

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
