const { sql, config } = require("./db");

async function cek() {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .query("SELECT * FROM Projects");

    console.log(result.recordset);

  } catch (err) {
    console.error(err);
  }
}

cek();
