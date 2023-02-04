const connection = require('./connection');

const newSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',

  );
  return insertId;
};

const salesRegistry = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [saleId, productId, quantity],
);
};

const validateIds = async () => {
  const [validatedIds] = await connection.execute('SELECT id FROM StoreManager.products');
  const validationList = validatedIds.map((item) => item.id);
  return validationList;
};

const getAllSales = async () => {
  const [results] = await connection.execute(` SELECT sa.id AS saleId, sa.date, 
  sp.product_id AS productId,
  sp.quantity FROM StoreManager.sales_products AS sp 
  INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
  ORDER BY sp.sale_id, sp.product_id ASC;`);
  return results;
};

const getSaleId = async (id) => {
  const [result] = await connection.execute(`SELECT
  sa.date, sp.product_id AS productId, sp.quantity FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id WHERE sale_id = ?
  ORDER BY sp.sale_id, sp.product_id ASC;`, [id]);
  return result;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return affectedRows;
};

const updateSale = async (quantity, id, productId) => {
  const [{ affectedRows }] = await connection
    .execute(`UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? 
    AND product_id = ?;`, [quantity, id, productId]);
  return affectedRows; 
};

module.exports = {
  newSale,
  salesRegistry,
  validateIds,
  getAllSales,
  getSaleId,
  deleteSale,
  updateSale,
};
