const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const newSale = async (sale) => {
    const columns = Object.keys(snakeize(sale)).join(', ');
    const placeholders = Object.keys(sale).map((_key) => ('?')).join(', ');
    const resultado = await connection
    .execute(`INSERT INTO sales(${columns}) VALUES(${placeholders})`, [...Object.values(sale)],
    );
    const [{ insertId }] = resultado;
      return {insertId, product};
    };
    
    module.exports = {
      newSale,
    };
    