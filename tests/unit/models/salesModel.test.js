const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { salesMock,
salesIdMock,  
insertSalesMock,
 } = require('../mock/products.mock');
const salesModel = require('../../../src/models/salesModel');


describe('Verificando camada Model por venda', function() {
  afterEach(sinon.restore);
  it('Verificando retorno de vendas na camada Model', async function() {
    sinon.stub(connection, 'execute').resolves([salesMock]);
    const results = await salesModel.getAllSales(); 
      expect(results).to.be.deep.equal(salesMock);
    } )
      
  it('Verificando camada Model pelo id da venda', async function() {
    sinon.stub(connection, 'execute').resolves([salesIdMock]);
    const results = await salesModel.getSaleId (1); 
      expect(results).to.be.deep.equal(salesIdMock);
    } )
    
   it('Verificando a inserção de novas vendas na camada Model', async function() {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const results = await salesModel.newSale(insertSalesMock); 
      expect(results).to.be.deep.equal(1);
    } ) 

    it('Verificando deleção de vendas na camada Model', async function() {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const delSale = '1'
      const results = await salesModel.deleteSale(delSale); 
      expect(results).to.be.deep.equal(1);
    } ) 

   /*  it('Verificando erros na deleção de vendas na camada Model', async function() {
        sinon.stub(connection, 'execute').resolves(0);
        const results = await salesModel.deleteSale(99); 
        expect(results).to.be.deep.equal(0);
      } )

      it('Verificando edição de vendas na camada Model', async function() {
        sinon.stub(connection, 'execute').resolves(1);
        const results = await salesModel.updateSale(8, , 2, ); 
        expect(results.type).to.be.deep.equal(null);
        expect(results.message).to.be.deep.equal({ id: 2, quantity: 8 })
      } )

     it('Verificando erros na edição de produtos na camada Model', async function() {
        sinon.stub(connection, 'execute').resolves(0);
        const results = await salesModel.updateSale(1000); 
        expect(results.type).to.be.deep.equal('error');
        expect(results.message).to.be.deep.equal('Sale not found')
      } ) */
  })
    


