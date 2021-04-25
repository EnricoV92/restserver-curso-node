
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            userRoutes: '/api/usuarios',
            authRoutes: '/api/auth',
            catRoutes: '/api/categorias',
            prodRoutes: '/api/productos',
            searchRoutes: '/api/search'
        }
        

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
        
        this.app.use(this.paths.authRoutes, require('../routes/auth.routes'));
        this.app.use(this.paths.userRoutes, require('../routes/user.routes'));
        this.app.use(this.paths.catRoutes, require('../routes/category.routes'));
        this.app.use(this.paths.prodRoutes, require('../routes/product.routes'));
        this.app.use(this.paths.searchRoutes, require('../routes/search.routes'));
    }

    listen () {
        
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto: ', this.port);
        });
    }
}

module.exports = Server;