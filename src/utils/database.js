// Vamos a gestionar la conexión con una base de datos 

//Importar "sequelize": 
const { Sequelize } = require('sequelize');

//Crear una instancia de sequelize con la configuración de conexión
const db = new Sequelize({
    host:"localhost",
    database: "users_crud",
    port:5432,
    username: "postgres",
    password: "root",
    dialect: "postgres"
}); 

module.exports = db;
