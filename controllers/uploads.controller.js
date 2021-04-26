
const path = require('path');
const fs = require('fs');
const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require('../models');

const cargarArchivo = async (req, res = response) => {

    try {
        const nameFile = await uploadFile(req.files)
    
        res.json({
            nameFile
        });
        
    } catch (msg) {
        res.status(400).json({msg});
    }
}

const actualizarImg = async (req, res = response) => {

    const { collection, id } = req.params;
    let modelo;

    switch (collection) {
        case 'usuarios':
            modelo = await User.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Product.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            });
    }
    
    // reset img existentes
    if(modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, modelo.img);
        if(fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    try {
        const nameFile = await uploadFile(req.files, undefined, collection);
    
        modelo.img = nameFile;
        await modelo.save();
        res.status(200).json({
            modelo
        });
        
    } catch (msg) {
        res.status(400).json({msg});
    }

    
}

const actualizarImgCloudinary = async (req, res = response) => {

    const { collection, id } = req.params;
    let modelo;

    switch (collection) {
        case 'usuarios':
            modelo = await User.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Product.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            });
    }
    
    // reset img existentes
    if(modelo.img) {
        const splitName = modelo.img.split('/');
        const nameFile = splitName[splitName.length -1 ];
        const [ public_id ] = nameFile.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.myFile;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
    modelo.img = secure_url;
    await modelo.save();
    res.status(200).json({
        modelo
    }); 
    
}

const mostrarImg = async (req, res = response) => {

    const { collection, id } = req.params;
    let modelo;

    switch (collection) {
        case 'usuarios':
            modelo = await User.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Product.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            });
    }
    
    
    if(modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, modelo.img);
        if(fs.existsSync(pathImg)) {
            return res.status(200).sendFile(pathImg)
        }
    }
    const pathImgPlaceholder = path.join(__dirname, '../assets/no-image.jpg');
    res.status(200).sendFile(pathImgPlaceholder);


}


module.exports = {
    cargarArchivo,
    actualizarImg,
    actualizarImgCloudinary,
    mostrarImg
}	