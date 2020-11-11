import express,{Application} from 'express';
import indexroutes from './routes/indexroutes';
import peliculasroutes from './routes/peliculasroutes';
import paisraouter from './routes/paisraouter';
import usuarioroutes from './routes/usuarioroutes';
import productoroutes from './routes/productoroutes';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import multer from 'multer';


class server{

    public app:Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    config():void{
        this.app.set('port',process.env.PORT || 8080);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname,'uploads')));
        //this.app.use('/uploads',express.static('uploads'));
        this.app.use(express.urlencoded({extended:false}));
        const storege = multer.diskStorage({
            destination: path.join(__dirname,'uploads'),
            filename: (req,file,cb) =>{
                cb(null,file.originalname);
            }
        });
        this.app.use(multer({
            storage:storege,
            dest: path.join(__dirname,'uploads')
        }).single('userImage'));
    }
    routes():void{
        this.app.use(indexroutes);
        this.app.use('/movie',peliculasroutes);
        this.app.use(paisraouter);
        this.app.use(usuarioroutes);
        this.app.use(productoroutes);
        //this.app.use('/uploads',express.static('uploads'));

    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Servidor en el puerto: ",this.app.get('port'));
        });
    }
}

const servidor=new server();
servidor.start();