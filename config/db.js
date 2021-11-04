const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mis", // Change the database name to newly created database name
  password: "root",
  port: 5432
});

module.exports = pool;
