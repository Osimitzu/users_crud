// Vamos a gestionar la conexión con una base de datos 

//Importar "sequelize": 
const { Sequelize } = require('sequelize');
require('dotenv').config();

//Crear una instancia de sequelize con la configuración de conexión
//Información db de render: 
const db = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  //dialectOptions: { ssl: { require: true, rejectUnauthorized: false} },
}); 

module.exports = db;


//postgres://osimitzu:ifxAUJuH8XWRYDtcse760PSb5PiE1h4n@dpg-che43dt269v75d29uh9g-a.oregon-postgres.render.com/users_crud_u9cs
