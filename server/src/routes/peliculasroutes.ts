import {Router} from 'express';
const BD = require('../config/configbd');

class peliculasRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/obtener',(req,res)=>{
            res.send("esta es una peliculas");
        });

        this.router.get('/getU',async(req,res)=>{
            let sql = "select * from HOL5 ";
            let result = await BD.Open(sql, [], false);
            let Users: { NOMBRE: any; COD: any; }[] = [];
            result.rows.map((user: any[]) => {
                let userSchema = {
                    "NOMBRE": user[0],
                    "COD": user[1]
                }
                Users.push(userSchema);
            });
            res.json(Users);
        });
    }
}

const peliculasroutes = new peliculasRoutes();
export default peliculasroutes.router;