const fetchProducts = async (nomeProduto) => { 
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${nomeProduto}`;
  try {
    const promise = await fetch(url);
    const promiseJson = await promise.json();
    // const jsonResults = await promiseJson.results;
    // console.log(jsonResults);
    return promiseJson;
  } catch (error) {
    return error;    
  }   
};
// fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
