require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui

  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Com o argumento "computador" teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
    // console.log(fetchProducts('computador'));
  })

  it('Com o argumento "computador", a função fetch deve ser chamada com o end point correto', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';   
    // console.log(endpoint);
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Com o argumento "computador", retorna uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const resposta = await fetchProducts('computador');
    expect(resposta).toEqual(computadorSearch);
  })

  it('verifica se, ao chamar a função fetchProducts() sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const resposta = await fetchProducts();
    expect(resposta).toEqual(new Error('You must provide an url'));
  })

});
