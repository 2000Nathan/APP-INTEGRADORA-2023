import express, { Application } from 'express';
import routesProduct from '../routes/product';
import routesUser from '../routes/user';
import { Product } from './product';
import { User } from './user';

//Servidor express para la aplicación de productos y usuarios (API)
class Server {

    // Propiedades de la clase Server (privadas)
    private app: Application;
    private port: string;

    // Constructor de la clase Server (inicializa las propiedades) y llama a los métodos listen, middlewares y routes
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    // Metodo para levantar el servidor en el puerto indicado en la propiedad port (3001)
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    // Metodo para definir las rutas de la aplicación (API)
    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
    }

    // Metodo para definir los middlewares de la aplicación (API)
    middlewares() {
        this.app.use(express.json());
    }

    // Database connection
    async dbConnect() {
        try {
            await Product.sync();
            await User.sync();
            console.log('Database online');
        } catch (error) {
            console.error(error);
        }
    }
}

export default Server;