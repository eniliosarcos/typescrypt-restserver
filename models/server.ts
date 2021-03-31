import express, {Application} from 'express';
import userRoutes from '../routes/usuario.route';
import cors from 'cors'

import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){

        this.app = express();
        this.port = process.env.PORT || '3000';

        //metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    //Conectar base de datos
    async dbConnection(){
        try {

            await db.authenticate();
            console.log('Database Online');
        } catch (error) {
            
            throw new Error(error);
        }
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //lectura del body
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto '+ this.port);
        })
    }
}

export default Server;