const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const allProducts = async () => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id ASC');
  return products;
};

const productId = async (id) => {
  const [
    [product],
  ] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return camelize(product);
};

const newProduct = async (product) => {
const columns = Object.keys(snakeize(product)).join(', ');
const placeholders = Object.keys(product).map((_key) => ('?')).join(', ');
const resultado = await connection
.execute(`INSERT INTO products(${columns}) VALUES(${placeholders})`, [...Object.values(product)]);
const [{ insertId: id }] = resultado;
  return { id, name: product.name };
};

const updateProduct = async (name, id) => {
  const [{ affectedRows }] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
const [{ affectedRows }] = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = {
  allProducts,
  productId,
  newProduct,
  updateProduct,
  deleteProduct,
};
