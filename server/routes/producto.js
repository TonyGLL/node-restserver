const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

// =========================== //
// Obtener todos los productos //
// =========================== //
app.get('/productos', (req, res) => {

    // Traer todos los productos
    // Populate: usuario categoria
    // paginado


});

// ======================= //
// Obtener producto por ID //
// ======================= //
app.get('/productos', (req, res) => {

    // Populate: usuario categoria

});

// ======================= //
// Crear un nuevo producto //
// ======================= //
app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({

        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if (err) {
            
            return res.status(500).json({

                ok: false,
                err
            });
        };

        res.status(201).json({

            ok: true,
            producto: productoDB
        });
    });
});

// ====================== //
// Actualizar un producto //
// ====================== //
app.put('/productos/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            
            return res.status(500).json({

                ok: false,
                err
            });
        };

        if (!productoDB) {
            
            return res.status(500).json({

                ok: false,
                err: {

                    message: "El ID no existe"
                }
            });
        };

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
            
                return res.status(500).json({
    
                    ok: false,
                    err
                });
            };
    
            res.json({
    
                ok: true,
                producto: productoGuardado
            });
        });
    }); 
});

// ================== //
// Borrar un producto //
// ================== //
app.delete('/productos/:id', (req, res) => {

    // Guardar el usuario
    // Guardar una categoria del listado

});


module.exports = app;