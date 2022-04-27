const fetchItem = async (idProduto) => {
  const url = `https://api.mercadolibre.com/items/${idProduto}`;
  try {
    const promise = await fetch(url);
    const promiseJson = await promise.json();
    // console.log(promiseJson);
    return promiseJson;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}