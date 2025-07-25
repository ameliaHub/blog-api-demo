// initDB.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const initSQL = `
  CREATE SEQUENCE IF NOT EXISTS users_id_seq START 1;
  CREATE SEQUENCE IF NOT EXISTS posts_id_seq START 1;
  CREATE SEQUENCE IF NOT EXISTS comments_id_seq START 1;

  CREATE TABLE IF NOT EXISTS users (
    id integer PRIMARY KEY DEFAULT nextval('users_id_seq'),
    username character varying(50) NOT NULL UNIQUE,
    password_hash text NOT NULL,
    role character varying(20) DEFAULT 'user',
    created_at timestamp without time zone DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS posts (
    id integer PRIMARY KEY DEFAULT nextval('posts_id_seq'),
    title character varying(255) NOT NULL,
    content text NOT NULL,
    published boolean DEFAULT false,
    author_id integer,
    created_at timestamp without time zone DEFAULT now(),
    image text,
    CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS comments (
    id integer PRIMARY KEY DEFAULT nextval('comments_id_seq'),
    content text NOT NULL,
    post_id integer,
    user_id integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

async function initDB() {
  try {
    await pool.query(initSQL);
    console.log("Base de datos inicializada correctamente.");
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
  } finally {
    await pool.end();
  }
}

initDB();
