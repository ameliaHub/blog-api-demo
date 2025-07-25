# Blog Fullstack

Este es un proyecto fullstack de un blog que permite a los usuarios registrarse, iniciar sesión y gestionar posts (crear, editar, eliminar y visualizar).  
La API está construida con Node.js y Express, el frontend con React.js, y la base de datos es PostgreSQL. La autenticación se maneja mediante Passport.js.

---

## Tecnologías usadas

- Backend: Node.js, Express.js  
- Frontend: React.js  
- Base de datos: PostgreSQL  
- Autenticación: Passport.js  

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
```

### Backend

```bash
cd backend
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
npm run dev
```

### Frontend

En otra terminal:

```bash
cd frontend
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

## Estructura del proyecto (opcional)

```
/backend
  ├── controllers
  ├── models
  ├── routes
  ├── app.js
  └── ...
/frontend
  ├── src
  │   ├── components
  │   ├── pages
  │   └── App.jsx
  └── ...
```

---

## Imágenes y contenido

Las imágenes mostradas han sido sacadas de unsplash y el contenido de los post ha sido generado mediante ChatGPT
