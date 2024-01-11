const pgp = require("pg-promise")();
const connectionString =
  "postgresql://Thanush19:gVCkpIl67TJm@ep-shiny-fire-69396007.ap-southeast-1.aws.neon.tech/inaippu?sslmode=require";
const db = pgp(connectionString);

// Log database connection information
db.connect()
  .then((obj) => {
    const serverVersion = obj.client.serverVersion;
    console.log(`Connected to PostgreSQL. Server version: ${serverVersion}`);
    obj.done(); // success, release the connection
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
    pgp.end(); // terminate connection pool (if any)
  });

module.exports = db;
