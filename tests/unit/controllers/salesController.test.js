const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { salesMock, salesIdMock, insertSalesMock }= require('../mock/sales.mock');
const  salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

chai.use(sinonChai);


describe('Verificando camada Controler por venda', function() {
    afterEach(sinon.restore);
    it('Verificando retorno de vendas na camada Controller', async function() {
      const response = {};
      const request = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAllSales').resolves(salesMock);
      await salesController.getAllSales({}, response);; 
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(salesMock);
      } ) 

      it('Verificando retorno de vendas por id na camada Controller', async function() {
        const response = {};
        const request = {params: {id: 1}};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSaleId').resolves({message: salesIdMock});
        await salesController.getSaleId(request, response);
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(salesIdMock);
        } ) 

        it('Verificando cadastro de vendas na camada Controller', async function() {
            const response = {};
            const request = {body: {productId: 2,
            quantity: 6}};
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(salesService, 'newSale').resolves({id: 2, itemsSold: insertSalesMock});
            await salesController.newSale(request, response);
            expect(response.status).to.have.been.calledWith(201);
            expect(response.json).to.have.been.calledWith({id: 2, itemsSold: insertSalesMock});
            } ) 

    })  