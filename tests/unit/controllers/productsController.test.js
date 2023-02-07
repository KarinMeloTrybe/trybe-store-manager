 const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productsMock, productsIdMock, insertProductsMock }= require('../mock/products.mock');
const  productsService = require('../../../src/services/productsServices');
const productController = require('../../../src/controllers/productsController');

chai.use(sinonChai);



describe('Verificando camada Controler por produto', function() {
  afterEach(sinon.restore);
  it('Verificando retorno de produtos na camada Controller', async function() {
    const response = {};
    const request = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsService, 'allProducts').resolves({ result: productsMock });
    await productController.allProducts({}, response);; 
    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(productsMock);
    } ) 

    it('Verificando retorno de produtos por id na camada Controller', async function() {
      const response = {};
      const request = {params: {id: 1}};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'productId').resolves({ result: productsIdMock });
      await productController.productId(request, response);; 
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(productsIdMock);
      } ) 
  
      it('Verificando erro de retorno de produtos por id na camada Controller', async function() {
        const response = {};
        const request = {params: {id: 1}};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'productId').resolves({});
        await productController.productId(request, response); 
        expect(response.status).to.have.been.calledWith(404);
        expect(response.json).to.have.been.calledWith({message: 'Product not found'});
        } ) 

        it('Verificando cadastro de novos produtos na camada Controller', async function() {
          const response = {};
          const request = {body: {name: 'batom'}};
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();
          sinon.stub(productsService, 'newProduct').resolves(insertProductsMock);
          await productController.newProduct(request, response); 
          expect(response.status).to.have.been.calledWith(201);
          expect(response.json).to.have.been.calledWith(insertProductsMock);
          } ) 

  })