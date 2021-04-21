
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutes = '/api/usuarios';
        this.authRoutes = '/api/auth';

        //Conectar DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async connectDB () {
        await dbConnection();
    }


    middlewares () {
        
        //CORS
        this.app.use(cors()); 

        //Lectura y parseo 
        this.app.use(express.json());
        
        //Dir Publico
        this.app.use(express.static('public'));
    }

    routes () {
        
        this.app.use(this.authRoutes, require('../routes/auth.routes'));
        this.app.use(this.usuariosRoutes, require('../routes/user.routes'));
    }

    listen () {
        
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto: ', this.port);
        });
    }
}

module.exports = Server;