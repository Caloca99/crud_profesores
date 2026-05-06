# CRUD de Profesores y Cursos

Sistema CRUD completo con Express.js, MySQL y carga de imagenes usando Multer.

## Funcionalidades

- Listar, crear, editar y eliminar profesores.
- Listar, crear, editar y eliminar cursos.
- Relacion entre cursos y profesores mediante `id_profesor`.
- Carga obligatoria de foto al registrar profesor y actualizacion opcional al editar.
- Validacion basica de campos obligatorios en backend.
- Interfaz HTML + CSS con Bootstrap.

## Requisitos

- Node.js 18 o superior.
- MySQL.

## Instalacion local

1. Instalar dependencias:

```bash
npm install
```

2. Crear la base de datos ejecutando `database.sql` en MySQL.

3. Crear un archivo `.env` tomando como base `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=crud_profesores
DB_PORT=3306
```

4. Iniciar el servidor:

```bash
npm run dev
```

5. Abrir:

```text
http://localhost:3000
```

## Estructura

```text
src/
  config/       Conexion a MySQL
  controllers/  Logica de profesores y cursos
  middleware/   Configuracion de Multer
  models/       Consultas SQL
  routes/       Rutas de la aplicacion
  views/        Layout HTML reutilizable
public/css/     Estilos
uploads/        Imagenes cargadas
database.sql    Script de base de datos
```

## Despliegue en Railway

Railway permite crear una app Node.js y una base de datos MySQL en el mismo proyecto.

1. Subir el proyecto a GitHub.
2. En Railway, crear un nuevo proyecto desde el repositorio de GitHub.
3. Agregar una base de datos MySQL al proyecto.
4. En el servicio web, configurar estas variables si Railway no las inyecta automaticamente:

```env
DB_HOST=valor_de_MYSQLHOST
DB_USER=valor_de_MYSQLUSER
DB_PASSWORD=valor_de_MYSQLPASSWORD
DB_NAME=valor_de_MYSQLDATABASE
DB_PORT=valor_de_MYSQLPORT
```

5. Usar estos comandos:

```text
Build command: npm install
Start command: npm start
```

6. Ejecutar `database.sql` en la base MySQL remota usando DBeaver.

Nota: las fotos se guardan en la carpeta `uploads`. En algunos hostings gratuitos el almacenamiento local puede perderse al reiniciar o redesplegar. Para un proyecto de examen funciona como demostracion, pero en produccion conviene usar Cloudinary, S3 o almacenamiento persistente.
