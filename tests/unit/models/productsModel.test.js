 const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { productsMock, 
  productsIdMock, 
 insertProductsMock,
 } = require('../mock/products.mock');
const productsModel = require('../../../src/models/productsModel');


describe('Verificando camada Model por produto', function() {
  afterEach(sinon.restore);
  it('Verificando retorno de produtos na camada Model', async function() {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const results = await productsModel.allProducts(); 
      expect(results).to.be.deep.equal(productsMock);
    } )
      
  it('Verificando camada Model pelo id do produto', async function() {
    sinon.stub(connection, 'execute').resolves([[productsIdMock]]);
    const results = await productsModel.productId(4); 
      expect(results).to.be.deep.equal(productsIdMock);
    } )
  it('Verificando a inserção de novos produtos na camada Model', async function() {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const results = await productsModel.newProduct(insertProductsMock); 
      expect(results).to.be.deep.equal({id: 1, name: 'batom'});
    } ) 

    it('Verificando deleção de produtos na camada Model', async function() {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const delProduct = 'batom'
      const results = await productsModel.deleteProduct(delProduct); 
      expect(results).to.be.deep.equal(1);
    } ) 
  })
    


