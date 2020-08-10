const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

// Default Options
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;     

    if(!req.files) {

        return res.status(400).json({

            ok: false,
            err: {
    
                message: 'No files were uploaded.' 
            }
        });
    } 

    // Validar Tipo
    let tiposValidos = ['productos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {

        return res.status(400).json({

            ok: false,
            err: {

                message: `Los tipos permitidos son: ${tiposValidos}`,
                ext: extension
            }
        });
    }


    let sampleFile = req.files.sampleFile;
    let cortName = sampleFile.name.split('.');
    let extension = cortName[cortName.length - 1]; 

    // Extensiones permitidas
    let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

    if (validExtensions.indexOf(extension) < 0) {
        
        return res.status(400).json({

            ok: false,
            err: {

                message: `Las expresiones permitidas son ${validExtensions.join(', ')}`
            }
        });
    }

    // Cambiar nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    // Save File
    sampleFile.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {

        if (err) {

            return res.status(500).json({

                ok: false,
                err
            });
        }
    
        if (tipo === 'usuarios') {
            
            imagenUsuario(id, res, nombreArchivo);
        }else{
            
            imagenProducto(id, res, nombreArchivo);
        }
      });
});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {

            deleteFile(nombreArchivo, 'usuarios');

            return res.status(500).json({

                ok: false,
                err
            });
        }

        if (!usuarioDB) {

            deleteFile(nombreArchivo, 'usuarios');

            return res.status(400).json({

                ok: false,
                err: {

                    message: 'Usuario no existe'
                }
            }); 
        }

        deleteFile(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {

            res.json({

                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {

            deleteFile(nombreArchivo, 'productos');

            return res.status(500).json({

                ok: false,
                err
            });
        }

        if (!productoDB) {

            deleteFile(nombreArchivo, 'productos');

            return res.status(400).json({

                ok: false,
                err: {

                    message: 'Producto no existe'
                }
            }); 
        }

        deleteFile(productoDB.img, 'productos');

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {

            res.json({

                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });
        });
    });
}

function deleteFile(imageName, type) {
    let pathImage = path.resolve(__dirname, `../../uploads/${ type }/${ imageName }`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = app;