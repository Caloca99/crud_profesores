const express = require("express");
const cursosController = require("../controllers/cursos.controller");

const router = express.Router();

router.get("/", cursosController.index);
router.get("/nuevo", cursosController.createForm);
router.post("/", cursosController.store);
router.get("/:id/editar", cursosController.editForm);
router.post("/:id", cursosController.update);
router.post("/:id/eliminar", cursosController.destroy);

module.exports = router;
