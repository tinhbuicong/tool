/**
 * Generates an SQL INSERT query for the given table and data.
 * @param {string} tableName - The name of the table.
 * @param {object} data - An object containing key-value pairs for the row.
 * @returns {object} - An object containing the SQL query and values array.
 */
function generateInsertQuery(tableName, data) {
  const keys = Object.keys(data); // Extract column names
  const values = Object.values(data); // Extract values

  // Build placeholders for the query (e.g., $1, $2, ...)
  const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

  // Create the query string
  const query = `
        INSERT INTO ${tableName} (${keys.join(", ")})
        VALUES (${placeholders});
    `;

  return { query, values }; // Return query and values for parameterized execution
}

module.exports = { generateInsertQuery };
