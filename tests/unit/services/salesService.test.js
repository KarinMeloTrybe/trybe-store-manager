const sinon = require('sinon');
const { expect } = require('chai');
const { salesMock, 
salesIdMock,
 } = require('../mock/sales.mock');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');


describe('Verificando camada Service por venda', function() {
  afterEach(sinon.restore);
  it('Verificando retorno de vendas na camada Service', async function() {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const results = await salesService.getAllSales(); 
      expect(results).to.deep.equal(salesMock);
    } )
      
   it('Verificando camada Service pelo id da venda', async function() {
    sinon.stub(salesModel, 'getSaleId').resolves(salesIdMock);
    const results = await salesService.getSaleId(1); 
      expect(results).to.deep.equal({type: null, message: salesIdMock});
    } )  


     it('Verificando deleção de vendas na camada Service', async function() {
      sinon.stub(salesModel, 'deleteSale').resolves(1);
      const results = await salesService.deleteSale(1); 
      expect(results.type).to.be.deep.equal(null);
    } )

    it('Verificando erros na deleção de vendas na camada Service', async function() {
      sinon.stub(salesModel, 'deleteSale').resolves(0);
      const results = await salesService.deleteSale(18); 
      expect(results.type).to.be.deep.equal('error');
      expect(results.message).to.be.deep.equal('Sale not found')
    } )

  })
    