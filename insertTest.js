require('dotenv').config();
const sql = require('mssql');

const config = require('./db').config;

async function test() {

    const pool = await sql.connect(config);

    await pool.request()

    .input(
        "title",
        sql.VarChar,
        "Azure Portfolio"
    )

    .input(
        "description",
        sql.VarChar,
        "Testing Azure SQL"
    )

    .query(`
        INSERT INTO Projects
        (title,description)
        VALUES
        (@title,@description)
    `);

    console.log("Insert Success");
}

test();
