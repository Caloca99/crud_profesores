require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const profesoresRoutes = require("./routes/profesores.routes");
const cursosRoutes = require("./routes/cursos.routes");

const app = express();
const uploadsPath = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(uploadsPath));

app.get("/", (req, res) => {
  res.redirect("/profesores");
});

app.use("/profesores", profesoresRoutes);
app.use("/cursos", cursosRoutes);

app.use((req, res) => {
  res.status(404).send("Pagina no encontrada");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Error interno del servidor");
});

module.exports = app;
