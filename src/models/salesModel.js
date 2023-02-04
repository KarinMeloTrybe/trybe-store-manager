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

module.exports = {
  newSale,
  salesRegistry,
  validateIds,
  getAllSales,
  getSaleId,
};
