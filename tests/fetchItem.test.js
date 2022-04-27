require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Com o argumento "MLB1615760527" teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
    // console.log(fetchItem('MLB1615760527'));
  })

  it('Com o argumento "MLB1615760527", a função fetch deve ser chamada com o end point correto', async () => {
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';   
    // console.log(endpoint);
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Com o argumento "MLB1615760527", retorna uma estrutura de dados igual ao objeto item', async () => {
    const resposta = await fetchItem('MLB1615760527');
    expect(resposta).toEqual(item);
  })

  it('verifica se, ao chamar a função fetchItem() sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const resposta = await fetchItem();
    expect(resposta).toEqual(new Error('You must provide an url'));
  })

});
