# CRUD de Profesores y Cursos

Sistema CRUD desarrollado con Express.js, MySQL y Multer para la carga de fotos de profesores.

## Funcionalidades

- Crear, listar, editar y eliminar profesores.
- Crear, listar, editar y eliminar cursos.
- Relacionar cada curso con un profesor mediante `id_profesor`.
- Cargar foto obligatoria al registrar un profesor.
- Validar campos obligatorios en el backend.
- Interfaz HTML con Bootstrap y CSS propio.

## Tecnologias

- Node.js
- Express.js
- MySQL
- mysql2
- Multer
- Bootstrap

## Estructura principal

```text
src/
  config/       Conexion a MySQL
  controllers/  Logica del CRUD
  middleware/   Carga de imagenes con Multer
  models/       Consultas a MySQL
  routes/       Rutas de profesores y cursos
  views/        HTML renderizado desde Express
public/css/     Estilos de la interfaz
uploads/        Carpeta para fotos subidas
database-aiven.sql Script para crear tablas en Aiven MySQL
render.yaml     Configuracion base para Render
```

## Variables de entorno

```env
PORT=3000
DB_HOST=host_mysql
DB_USER=usuario_mysql
DB_PASSWORD=password_mysql
DB_NAME=defaultdb
DB_PORT=15481
DB_SSL=true
```

## Instalacion local

```bash
npm install
npm start
```

La aplicacion se abre en:

```text
http://localhost:3000
```

## Base de datos

Para Aiven MySQL, ejecutar el archivo:

```text
database-aiven.sql
```

Este script crea las tablas `profesores` y `cursos` con su relacion.

## Despliegue

El proyecto esta preparado para desplegarse en Render usando:

```text
Build command: npm install
Start command: npm start
```
