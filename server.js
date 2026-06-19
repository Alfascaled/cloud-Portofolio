require("dotenv").config();

const express = require("express");
const cors = require("cors");

const projectRoutes =
    require("./routes/projectRoutes");

const messageRoutes =
    require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});