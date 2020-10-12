import {Router} from 'express';

class indexRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/',(req,res)=>{
            res.send("hola desde routes index");
        });

        this.router.get('/hola1',(req,res)=>{
            res.send("hola desde hola1 routes index");
        });
    }
}

const indexroutes = new indexRoutes();
export default indexroutes.router;
