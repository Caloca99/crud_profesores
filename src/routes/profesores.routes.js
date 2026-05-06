const express = require("express");
const profesoresController = require("../controllers/profesores.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", profesoresController.index);
router.get("/nuevo", profesoresController.createForm);
router.post("/", upload.single("foto"), profesoresController.store);
router.get("/:id/editar", profesoresController.editForm);
router.post("/:id", upload.single("foto"), profesoresController.update);
router.post("/:id/eliminar", profesoresController.destroy);

module.exports = router;
