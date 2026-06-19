const { sql, config } = require("../db");

exports.getProjects = async (req, res) => {

    try {

        const pool =
            await sql.connect(config);

        const result =
            await pool.request()
                .query("SELECT * FROM Projects");

        res.json(result.recordset);

    } catch (err) {

        res.status(500).json(err);

    }

};

exports.addProject = async (req, res) => {

    try {

        const { title, description } =
            req.body;

        const pool =
            await sql.connect(config);

        await pool.request()

            .input("title", sql.VarChar, title)

            .input(
                "description",
                sql.VarChar,
                description
            )

            .query(`
      INSERT INTO Projects
      (title,description)
      VALUES
      (@title,@description)
    `);

        res.json({
            message: "Project Added"
        });

    } catch (err) {

        res.status(500).json(err);

    }

};

exports.updateProject = async (req, res) => {

    try {

        const id = req.params.id;

        const { title, description } =
            req.body;

        const pool =
            await sql.connect(config);

        await pool.request()

            .input("id", sql.Int, id)

            .input("title", sql.VarChar, title)

            .input(
                "description",
                sql.VarChar,
                description
            )

            .query(`
      UPDATE Projects
      SET
      title=@title,
      description=@description
      WHERE id=@id
    `);

        res.json({
            message: "Project Updated"
        });

    } catch (err) {

        res.status(500).json(err);

    }

};

exports.deleteProject = async (req, res) => {

    try {

        const id = req.params.id;

        const pool =
            await sql.connect(config);

        await pool.request()

            .input("id", sql.Int, id)

            .query(`
      DELETE FROM Projects
      WHERE id=@id
    `);

        res.json({
            message: "Project Deleted"
        });

    } catch (err) {

        res.status(500).json(err);

    }

};