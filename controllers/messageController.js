const { sql, config } = require("../db");

exports.saveMessage =
    async (req, res) => {

        try {

            const {
                name,
                email,
                message
            } = req.body;

            const pool =
                await sql.connect(config);

            await pool.request()

                .input("name", sql.VarChar, name)

                .input("email", sql.VarChar, email)

                .input(
                    "message",
                    sql.VarChar,
                    message
                )

                .query(`
      INSERT INTO Messages
      (name,email,message)
      VALUES
      (@name,@email,@message)
    `);

            res.json({
                message: "Message Sent"
            });

        } catch (err) {

            res.status(500).json(err);

        }

    };