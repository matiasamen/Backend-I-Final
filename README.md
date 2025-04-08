# Proyecto E-commerce Backend

Alumno: **Cristhian Matias Amén** 

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB (con Mongoose)
- Handlebars
- Socket.IO

## Funcionalidades

- Crear y eliminar productos desde el navegador en tiempo real.
- Comunicación en tiempo real con WebSockets.
- Persistencia de datos con MongoDB.
- Vistas dinámicas usando Handlebars.


# 🛒 Backend E-commerce

Una aplicación de comercio electrónico con API REST, vistas dinámicas y actualizaciones en tiempo real.

## 🚀 Instalación

### Clona el repositorio:

   git clone https://github.com/tu-usuario/tu-repo.git

   Instalá las dependencias:

npm install

### Iniciá el servidor:

npm start

 Asegurate de tener MongoDB funcionando localmente o configurado en .env/config/db.js


## Endpoints
GET /api/products → Lista todos los productos.

POST /api/carts → Crea un carrito.

GET / → Vista general de productos.

GET /liveproducts → Vista en tiempo real con WebSockets.

### La carpeta node_modules está ignorada (ver .gitignore), pero se puede regenerar con npm install.

El archivo package-lock.json garantiza versiones exactas de dependencias.

# Muchas graciasa profe por su enseñanza y disculpe la espera del trabajo pero me saltaban errores y no lo queria entregar incompleto. preferia esperar un poco mas hasta arreglarlos.
