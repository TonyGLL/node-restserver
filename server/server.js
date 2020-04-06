require('./config/config');

const express = require('express');
const mongoose = require('mongoose'); 

const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Habilitar carpeta PUBLIC 
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuracion Global de Routes
app.use(require('./routes/index'));

// Coneccion con Mongoose
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},

    // Verificacion que la Base de Datos esta Online
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');
    }
);
 
// Verifucacion de que el server esta activo
app.listen(process.env.PORT, () => {

    console.log('Escuchando el puerto:', process.env.PORT);  
});