# BLOG

El proyecto permite el visualizado de publicaciones y comentarios para usuarios no registrados y la creación de los mismos por usuarios autorizados. Quedándo restringida la creación de publicaciones para usuarios con rol de admin que cuentan con un propio panel de administración desde el que pueden crear, editar, visualizar y eliminar las publicaciones.  


---

## Tecnologías usadas

- Backend: Node.js, Express.js  
- Frontend: React.js  
- Base de datos: PostgreSQL  
- Autenticación y rutas protegidas: Passport.js  

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
```

### Backend

```bash
cd blog-api
npm install
```

Configura las variables de entorno (ejemplo):

```env
DATABASE_URL=tu_conexion_postgresql
SESSION_SECRET=una_clave_secreta_para_sesiones
PORT=4000
```

Inicia el servidor backend:

```bash
node app.js
```

### Frontend

En otra terminal:

```bash
cd blog-public
npm install
npm run dev
```

---

## Uso

- Accede al frontend en \`http://localhost:3000\` (o el puerto que indique Vite).  
- Regístrate o inicia sesión para poder gestionar posts.  
- Puedes crear, editar, eliminar y visualizar los posts.

---

## Funcionalidades

- Registro e inicio de sesión con autenticación segura usando Passport.js.  
- CRUD completo de posts.  
- Interfaz sencilla e intuitiva con React.js.

---

## Imágenes y contenido

Las imágenes mostradas han sido sacadas de unsplash y el contenido de los post ha sido generado mediante ChatGPT
