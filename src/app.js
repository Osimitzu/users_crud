//Importamos express 
const express = require('express');
const db = require('./utils/database');
const Users = require('./models/users.model');

db.authenticate() // es una función asincrona
    .then(() => console.log('Base de datos conectada'))
    .catch((err) => console.log(err));

db.sync() // si la tabla no existe la crea...
    .then(() => console.log('Base de datos sincronizada'))
    .catch(error => console.log(error));

//Creamos una instancia de express llamada app
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.post('/users', async (req, res) => {
    try {
        //Extraemos el cuerpo de la petición
        //{firstname, lastname, email, password}
        const newUser = req.body;
        //INSERT INTO users (firstname, lastname, email, password) VALUES (...)
        await Users.create(newUser);
        //respondemos con un 201 - created
        res.status(201).send();
    } catch (error) {
        //Si algo sale mal, respondemos con el error.
        res.status(400).json(error);
    }
});

// Obtener a todos los usuarios de la base de datos
//SELECT * FROM users;
//Users.findAll()

//SELECT firstname, lastname, email, password FROM users;
//{attributes: ['firstname', 'lastname', 'email']}

//SELECT id, firstname, lastname, email, createdAt, updatedAt FROM users;

app.get('/users', async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.json(users);
    } catch (error) {
        res.status(400).json(error);
    }
});

// get user by id

app.get("/users/id/:id", async (req, res) => {
  try {
    //Para recuperar el parametro de ruta ==> req.params
    // ? es un objeto que tiene todos los parametros de la ruta
    // ? {id: 3, user: 'Ana'} 
    const { id } = req.params;
    console.log(req.params);    

    const user = await Users.findByPk(id, {
        attributes: {
            exclude: ['password']
        }
    });
    res.json(user); 
    
  } catch (error) {
    res.status(400).json(error);
  }
});

// Si quiero encontrar por otro campo
// encontrar a un usuario por su correo electronico

app.get('/users/email/:email', async (req, res) => {
    try {
        const { email } = req.params; 
        const user = await Users.findOne({
            where: {email} // { email: email }
        });
        res.json(user); 
    } catch (error) {
        res.status(400).json(error);
    }
});

// Eliminar un usuario 
// DELETE FROM users WHERE id=3; eliminar al usuario con el id=3

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Users.destroy({
            where: {id} // { id : id }
        });
        res.status(204).send();     
    } catch (error) {
        res.status(400).json(error);        
    }
});

// update => actualizar información de un usuario
// UPDATE users SET firstname="sdafsad", lastname="asdasf" WHERE id="x"

app.put ('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname } = req.body;
        await Users.update(
            {
                firstname, lastname
            },
            {
                where: { id },
            }
        );
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

//Dejar escuchando a nuestro servidor en un puerto:
app.listen(8000, () => {
    console.log('Servidor escuchando en el puerto 8000 :D');
});

console.log(process.env);


//Servidor
//Configuramos la conexión 
//Verificamos la conexión con db


//nodemon --- hot reload
//dependencia de desarrollo 


