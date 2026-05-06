const pool = require("../config/db");

async function findAll() {
  const [rows] = await pool.query(`
    SELECT p.id_profesor, p.nombre, p.especialidad, p.foto, COUNT(c.id_curso) AS total_cursos
    FROM profesores p
    LEFT JOIN cursos c ON c.id_profesor = p.id_profesor
    GROUP BY p.id_profesor
    ORDER BY p.id_profesor DESC
  `);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM profesores WHERE id_profesor = ?", [id]);
  return rows[0];
}

async function create({ nombre, especialidad, foto }) {
  const [result] = await pool.query(
    "INSERT INTO profesores (nombre, especialidad, foto) VALUES (?, ?, ?)",
    [nombre, especialidad, foto]
  );
  return result.insertId;
}

async function update(id, { nombre, especialidad, foto }) {
  if (foto) {
    await pool.query(
      "UPDATE profesores SET nombre = ?, especialidad = ?, foto = ? WHERE id_profesor = ?",
      [nombre, especialidad, foto, id]
    );
    return;
  }

  await pool.query(
    "UPDATE profesores SET nombre = ?, especialidad = ? WHERE id_profesor = ?",
    [nombre, especialidad, id]
  );
}

async function remove(id) {
  await pool.query("DELETE FROM profesores WHERE id_profesor = ?", [id]);
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
