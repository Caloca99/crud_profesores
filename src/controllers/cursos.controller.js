const cursosModel = require("../models/cursos.model");
const profesoresModel = require("../models/profesores.model");
const { renderPage, escapeHtml, alert } = require("../views/layout");

function validateCurso(body) {
  if (!body.nombre || !body.id_profesor) {
    return "Nombre y profesor son obligatorios.";
  }
  return null;
}

function options(profesores, selectedId) {
  return profesores.map((profesor) => `
    <option value="${profesor.id_profesor}" ${Number(selectedId) === Number(profesor.id_profesor) ? "selected" : ""}>
      ${escapeHtml(profesor.nombre)}
    </option>
  `).join("");
}

function cursoForm({ curso = {}, profesores = [], action, title, error }) {
  const content = `
    <div class="page-header">
      <div>
        <p class="text-uppercase text-secondary small mb-1">Cursos</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <a class="btn btn-outline-secondary" href="/cursos">Volver</a>
    </div>
    ${alert(error)}
    <form class="panel" action="${action}" method="POST">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label" for="nombre">Nombre del curso</label>
          <input class="form-control" id="nombre" name="nombre" value="${escapeHtml(curso.nombre)}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="id_profesor">Profesor</label>
          <select class="form-select" id="id_profesor" name="id_profesor" required>
            <option value="">Seleccione un profesor</option>
            ${options(profesores, curso.id_profesor)}
          </select>
        </div>
      </div>
      <div class="mt-4">
        <button class="btn btn-primary" type="submit">Guardar</button>
      </div>
    </form>
  `;
  return renderPage(title, content);
}

async function index(req, res, next) {
  try {
    const cursos = await cursosModel.findAll();
    const rows = cursos.map((curso) => `
      <tr>
        <td>${escapeHtml(curso.nombre)}</td>
        <td>${curso.profesor ? escapeHtml(curso.profesor) : "<span class='text-secondary'>Sin profesor</span>"}</td>
        <td class="actions">
          <a class="btn btn-sm btn-outline-primary" href="/cursos/${curso.id_curso}/editar">Editar</a>
          <form action="/cursos/${curso.id_curso}/eliminar" method="POST" onsubmit="return confirm('Eliminar curso?')">
            <button class="btn btn-sm btn-outline-danger" type="submit">Eliminar</button>
          </form>
        </td>
      </tr>
    `).join("");

    const content = `
      <div class="page-header">
        <div>
          <p class="text-uppercase text-secondary small mb-1">Gestion academica</p>
          <h1>Cursos</h1>
        </div>
        <a class="btn btn-primary" href="/cursos/nuevo">Nuevo curso</a>
      </div>
      <div class="panel table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Profesor asociado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>${rows || "<tr><td colspan='3' class='text-center text-secondary py-4'>No hay cursos registrados.</td></tr>"}</tbody>
        </table>
      </div>
    `;
    res.send(renderPage("Cursos", content));
  } catch (error) {
    next(error);
  }
}

async function createForm(req, res, next) {
  try {
    const profesores = await profesoresModel.findAll();
    res.send(cursoForm({ profesores, action: "/cursos", title: "Nuevo curso" }));
  } catch (error) {
    next(error);
  }
}

async function store(req, res, next) {
  try {
    const profesores = await profesoresModel.findAll();
    const error = validateCurso(req.body);
    if (error) {
      return res.status(400).send(cursoForm({
        curso: req.body,
        profesores,
        action: "/cursos",
        title: "Nuevo curso",
        error,
      }));
    }

    await cursosModel.create({
      nombre: req.body.nombre.trim(),
      id_profesor: req.body.id_profesor,
    });
    res.redirect("/cursos");
  } catch (error) {
    next(error);
  }
}

async function editForm(req, res, next) {
  try {
    const curso = await cursosModel.findById(req.params.id);
    if (!curso) return res.status(404).send("Curso no encontrado");
    const profesores = await profesoresModel.findAll();
    res.send(cursoForm({
      curso,
      profesores,
      action: `/cursos/${curso.id_curso}`,
      title: "Editar curso",
    }));
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const curso = await cursosModel.findById(req.params.id);
    if (!curso) return res.status(404).send("Curso no encontrado");
    const profesores = await profesoresModel.findAll();
    const error = validateCurso(req.body);
    if (error) {
      return res.status(400).send(cursoForm({
        curso: { ...curso, ...req.body },
        profesores,
        action: `/cursos/${curso.id_curso}`,
        title: "Editar curso",
        error,
      }));
    }

    await cursosModel.update(req.params.id, {
      nombre: req.body.nombre.trim(),
      id_profesor: req.body.id_profesor,
    });
    res.redirect("/cursos");
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    await cursosModel.remove(req.params.id);
    res.redirect("/cursos");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  createForm,
  store,
  editForm,
  update,
  destroy,
};
