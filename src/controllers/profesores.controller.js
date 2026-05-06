const profesoresModel = require("../models/profesores.model");
const { renderPage, escapeHtml, alert } = require("../views/layout");

function imageToDataUrl(file) {
  if (!file) return null;
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
}

function fotoSrc(foto) {
  if (!foto) return "";
  return foto.startsWith("data:image/") ? foto : `/uploads/${escapeHtml(foto)}`;
}

function validateProfesor(body, file, requirePhoto = false) {
  if (!body.nombre || !body.especialidad) {
    return "Nombre y especialidad son obligatorios.";
  }
  if (requirePhoto && !file) {
    return "La foto del profesor es obligatoria.";
  }
  return null;
}

function profesorForm({ profesor = {}, action, title, error, requirePhoto = false }) {
  const content = `
    <div class="page-header">
      <div>
        <p class="text-uppercase text-secondary small mb-1">Profesores</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <a class="btn btn-outline-secondary" href="/profesores">Volver</a>
    </div>
    ${alert(error)}
    <form class="panel" action="${action}" method="POST" enctype="multipart/form-data">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label" for="nombre">Nombre</label>
          <input class="form-control" id="nombre" name="nombre" value="${escapeHtml(profesor.nombre)}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="especialidad">Especialidad</label>
          <input class="form-control" id="especialidad" name="especialidad" value="${escapeHtml(profesor.especialidad)}" required>
        </div>
        <div class="col-12">
          <label class="form-label" for="foto">Foto del profesor</label>
          <input class="form-control" id="foto" name="foto" type="file" accept="image/*" ${requirePhoto ? "required" : ""}>
          ${profesor.foto ? `<img class="preview mt-3" src="${fotoSrc(profesor.foto)}" alt="Foto actual">` : ""}
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
    const profesores = await profesoresModel.findAll();
    const rows = profesores.map((profesor) => `
      <tr>
        <td>${profesor.foto ? `<img class="avatar" src="${fotoSrc(profesor.foto)}" alt="Foto">` : "<span class='badge text-bg-secondary'>Sin foto</span>"}</td>
        <td>${escapeHtml(profesor.nombre)}</td>
        <td>${escapeHtml(profesor.especialidad)}</td>
        <td>${profesor.total_cursos}</td>
        <td class="actions">
          <a class="btn btn-sm btn-outline-primary" href="/profesores/${profesor.id_profesor}/editar">Editar</a>
          <form action="/profesores/${profesor.id_profesor}/eliminar" method="POST" onsubmit="return confirm('Eliminar profesor?')">
            <button class="btn btn-sm btn-outline-danger" type="submit">Eliminar</button>
          </form>
        </td>
      </tr>
    `).join("");

    const content = `
      <div class="page-header">
        <div>
          <p class="text-uppercase text-secondary small mb-1">Gestion academica</p>
          <h1>Profesores</h1>
        </div>
        <a class="btn btn-primary" href="/profesores/nuevo">Nuevo profesor</a>
      </div>
      <div class="panel table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Cursos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>${rows || "<tr><td colspan='5' class='text-center text-secondary py-4'>No hay profesores registrados.</td></tr>"}</tbody>
        </table>
      </div>
    `;
    res.send(renderPage("Profesores", content));
  } catch (error) {
    next(error);
  }
}

function createForm(req, res) {
  res.send(profesorForm({ action: "/profesores", title: "Nuevo profesor", requirePhoto: true }));
}

async function store(req, res, next) {
  try {
    const error = validateProfesor(req.body, req.file, true);
    if (error) {
      return res.status(400).send(profesorForm({
        profesor: req.body,
        action: "/profesores",
        title: "Nuevo profesor",
        error,
        requirePhoto: true,
      }));
    }

    await profesoresModel.create({
      nombre: req.body.nombre.trim(),
      especialidad: req.body.especialidad.trim(),
      foto: imageToDataUrl(req.file),
    });
    res.redirect("/profesores");
  } catch (error) {
    next(error);
  }
}

async function editForm(req, res, next) {
  try {
    const profesor = await profesoresModel.findById(req.params.id);
    if (!profesor) return res.status(404).send("Profesor no encontrado");
    res.send(profesorForm({
      profesor,
      action: `/profesores/${profesor.id_profesor}`,
      title: "Editar profesor",
    }));
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const profesor = await profesoresModel.findById(req.params.id);
    if (!profesor) return res.status(404).send("Profesor no encontrado");

    const error = validateProfesor(req.body, req.file);
    if (error) {
      return res.status(400).send(profesorForm({
        profesor: { ...profesor, ...req.body },
        action: `/profesores/${profesor.id_profesor}`,
        title: "Editar profesor",
        error,
      }));
    }

    await profesoresModel.update(req.params.id, {
      nombre: req.body.nombre.trim(),
      especialidad: req.body.especialidad.trim(),
      foto: imageToDataUrl(req.file),
    });
    res.redirect("/profesores");
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    await profesoresModel.remove(req.params.id);
    res.redirect("/profesores");
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
