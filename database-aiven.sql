CREATE TABLE IF NOT EXISTS profesores (
  id_profesor INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  especialidad VARCHAR(100) NOT NULL,
  foto VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cursos (
  id_curso INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  id_profesor INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cursos_profesores
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO profesores (nombre, especialidad, foto)
SELECT 'Ana Torres', 'Matematica', NULL
WHERE NOT EXISTS (SELECT 1 FROM profesores LIMIT 1);

INSERT INTO cursos (nombre, id_profesor)
SELECT 'Algebra Lineal', id_profesor
FROM profesores
WHERE nombre = 'Ana Torres'
  AND NOT EXISTS (SELECT 1 FROM cursos LIMIT 1);
