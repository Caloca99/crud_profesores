const pool = require("../config/db");

async function findAll() {
  const [rows] = await pool.query(`
    SELECT c.id_curso, c.nombre, c.id_profesor, p.nombre AS profesor
    FROM cursos c
    LEFT JOIN profesores p ON p.id_profesor = c.id_profesor
    ORDER BY c.id_curso DESC
  `);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM cursos WHERE id_curso = ?", [id]);
  return rows[0];
}

async function create({ nombre, id_profesor }) {
  const [result] = await pool.query(
    "INSERT INTO cursos (nombre, id_profesor) VALUES (?, ?)",
    [nombre, id_profesor]
  );
  return result.insertId;
}

async function update(id, { nombre, id_profesor }) {
  await pool.query(
    "UPDATE cursos SET nombre = ?, id_profesor = ? WHERE id_curso = ?",
    [nombre, id_profesor, id]
  );
}

async function remove(id) {
  await pool.query("DELETE FROM cursos WHERE id_curso = ?", [id]);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
