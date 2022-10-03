import express, {Application} from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app:Application;
    private port:String;
    private paths = {
        users:'/api/users'
    }
    constructor() {

        this.port = process.env.PORT || '8081';
        
        this.app = express();


        this.connectDB();

       
        this.middlewares();

       
        this.routes();


       

        
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //BODY PARSE
        this.app.use( express.json() );

        //PUBLIC FOLDER
        this.app.use( express.static('public'));

    }


    routes(){

        this.app.use(this.paths.users,userRoutes);
    }


    async connectDB(){
        try {

           await db.authenticate();

           console.log('DB online');
            
        } catch (error) {

            throw new Error(`DB connectin error ${error}`);    
        }
        
    }


    init(){
        this.app.listen(this.port, () =>{
            console.log(`Server running on port: ${this.port}`);
        })
    }
}

export default Server;