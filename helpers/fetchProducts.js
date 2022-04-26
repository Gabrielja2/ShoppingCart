const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = async () => {  
  const ENDPOINT = `${url}computador`;

  const promise = await fetch(ENDPOINT);
  const promiseJson = await promise.json();
  const jsonResults = await promiseJson.results;
  // console.log(jsonResults);
  return jsonResults; 
};
fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
