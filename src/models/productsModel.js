const camelize = require('camelize');
const connection = require('./connection');

const allProducts = async () => {
  const [products] = await connection
  .execute('SELECT * FROM StoreManager.products ORDER BY id ASC');
  return products;
};

const productId = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return camelize(product);
};
module.exports = {
  allProducts,
  productId,
};