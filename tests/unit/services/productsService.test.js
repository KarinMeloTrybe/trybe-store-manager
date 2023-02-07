const sinon = require('sinon');
const { expect } = require('chai');
const { productsMock, 
  productsIdMock, 
  insertProductsMock,
  searchProductsMock,
 } = require('./mocks/servicesMock');
const productsService = require('../../../src/services/productsServices');
const productsModel = require('../../../src/models/productsModel');


describe('Verificando camada Service por produto', function() {
  afterEach(sinon.restore);
  it('Verificando retorno de produtos na camada Service', async function() {
    sinon.stub(productsModel, 'allProducts').resolves(productsMock);
    const results = await productsService.allProducts(); 
      expect(results).to.deep.equal({ result: productsMock });
    } )
      
  it('Verificando camada Service pelo id do produto', async function() {
    sinon.stub(productsModel, 'productId').resolves(productsIdMock);
    const results = await productsService.productId(1); 
      expect(results).to.deep.equal({ result: productsIdMock});
    } )  

  it('Verificando a inserção de novos produtos na camada Service', async function() {
      sinon.stub(productsModel, 'newProduct').resolves(insertProductsMock);
      const results = await productsService.newProduct(1, 'batom'); 
      expect(results).to.be.deep.equal({ name: 'batom'});
    } ) 

     it('Verificando deleção de produtos na camada Service', async function() {
      sinon.stub(productsModel, 'deleteProduct').resolves(1);
      const results = await productsService.deleteProduct(1); 
      expect(results.type).to.be.deep.equal(null);
    } )

    it('Verificando erros na deleção de produtos na camada Service', async function() {
      sinon.stub(productsModel, 'deleteProduct').resolves(0);
      const results = await productsService.deleteProduct(1000); 
      expect(results.type).to.be.deep.equal('error');
      expect(results.message).to.be.deep.equal('Product not found')
    } )

    it('Verificando erros na edição de produtos na camada Service', async function() {
      sinon.stub(productsModel, 'updateProduct').resolves(0);
      const results = await productsService.updateProduct(1000); 
      expect(results.type).to.be.deep.equal('error');
      expect(results.message).to.be.deep.equal('Product not found')
    } )

    it('Verificando edição de produtos na camada Service', async function() {
      sinon.stub(productsModel, 'updateProduct').resolves(1);
      const results = await productsService.updateProduct('Martelo do Hulk', 1); 
      expect(results.type).to.be.deep.equal(null);
      expect(results.message).to.be.deep.equal({ id: 1, name: 'Martelo do Hulk' })
    } )

    it('Verificando search de produtos na camada Service', async function() {
      sinon.stub(productsModel, 'getSearchProducts').resolves(searchProductsMock);
      const results = await productsService.getSearchProducts('Martelo'); 
      expect(results).to.deep.equal(searchProductsMock)
    } )
  })
    