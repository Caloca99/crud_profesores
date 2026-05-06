function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderPage(title, content) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | CRUD Profesores</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container">
      <a class="navbar-brand fw-semibold" href="/profesores">CRUD Profesores</a>
      <div class="navbar-nav flex-row gap-3">
        <a class="nav-link" href="/profesores">Profesores</a>
        <a class="nav-link" href="/cursos">Cursos</a>
      </div>
    </div>
  </nav>
  <main class="container py-4">
    ${content}
  </main>
</body>
</html>`;
}

function alert(message, type = "danger") {
  if (!message) return "";
  return `<div class="alert alert-${type}" role="alert">${escapeHtml(message)}</div>`;
}

module.exports = {
  escapeHtml,
  renderPage,
  alert,
};
