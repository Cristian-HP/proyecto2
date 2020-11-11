import {Router} from 'express';
const BD = require('../config/configbd');

class paisRouter{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/pais',async(req,res)=>{
            let sql = "select * from PAIS ";
            let result = await BD.Open(sql, [], false);
            let Pais :{id_pais:any;nombre:any}[] = [];
            result.rows.map((pass: any[]) => {
                let userSchema = {
                    "id_pais":pass[0],
                    "nombre": pass[2]
                }
                Pais.push(userSchema);
            });

            res.json(Pais);
        });

        this.router.post('/pais',async(req,res)=>{
            let sql = "select nombre from PAIS where id_pais ="
            sql+=req.body.id;
            let result = await BD.Open(sql,[],false);
            result.rows.map((pass: any[]) => {
                let userSchema = {
                    "nombre": pass[0]
                }
                console.log(userSchema);
                res.json(userSchema);
            });
        });
    }
}

const paisrouter = new paisRouter();
export default paisrouter.router;