const { sql, config } = require("./db");

async function test() {
  try {
    await sql.connect(config);
    console.log("✅ Connected to Azure SQL");
  } catch (err) {
    console.error(err);
  }
}

test();
