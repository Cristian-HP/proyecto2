import {Router} from 'express';
const BD = require('../config/configbd');

class productoRouter{
    catalogo: any = [];
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/producto',async(req,res)=>{
            console.log(req.body);
            let sql = "INSERT INTO PUBLICACION(nombre,detalle_producto,precio,fotoproducto,id_usuario,categoria) VALUES(";
            sql+="'"+req.body.nombre+"','"+req.body.detalle_producto+"',"+req.body.precio+",'"+req.body.fotoproducto+"',"+req.body.id_usuario+",'"+req.body.categoria+"')";

            try {
                let result = await BD.Open(sql, [], true);
                console.log(result);
                let response = { status: "EXITO2" };
                res.json(response);
            } catch (error) {
                let response = { status: "ERROR2" };
                res.json(response);
            }
        });

        this.router.post('/palabra',async(req,res)=>{
            console.log(req.body);
            let sql = "INSERT INTO PALABRASCLAVES(palabra,id_producto) VALUES(";
            sql+="'"+req.body.palabra+"',"+req.body.id_publicacion+")";

            try {
                let result = await BD.Open(sql, [], true);
                console.log(result);
                let response = { status: "EXITO2" };
                res.json(response);
            } catch (error) {
                let response = { status: "ERROR2" };
                res.json(response);
            }
        });


        this.router.post('/palabraclave',async(req,res)=>{
            console.log(req.body);
            let PALABRA:any= {
                palabras:""
            };
            let sql = "select palabra from PALABRASCLAVES where id_producto=";
            sql+=req.body.id_publicacion;
            let result = await BD.Open(sql,[],false);
            let palabraclave = "";
            result.rows.map((palabras: any[]) => {
                palabraclave+=palabras[0]+","
            });
            PALABRA.palabras=palabraclave;
            //console.log(PALABRA);
            res.json(PALABRA);
        });

        this.router.get('/ultimopro',async(req,res)=>{
            let sql = "select max(id_publicacion) from PUBLICACION";
            let result = await BD.Open(sql,[],false);
            result.rows.map((publi: any[]) => {
                let userSchema = {
                    "id_publicacion": publi[0]
                }
                console.log(userSchema);
                res.json(userSchema);
            });
        });

        this.router.get('/producto',async(req,res)=>{
            let Catalogo :{id_publicacion:any;nombre:any;precio:any;fotoproducto:any;id_usuario:any;categoria:any;detalle:any}[]=[];
            let sql = "select * from PUBLICACION where status=1";
            let result = await BD.Open(sql,[],false);
            result.rows.map((publi: any[]) => {
                let userSchema = {
                    "id_publicacion": publi[0],
                    "nombre":publi[1],
                    "precio":publi[3],
                    "fotoproducto":publi[4],
                    "id_usuario":publi[5],
                    "categoria":publi[6],
                    "detalle":publi[2]
                }
                Catalogo.push(userSchema);
            });
            res.json(Catalogo);
        });


        this.router.get('/categoria',async(req,res)=>{
            let Categoria :{nombre:any}[]=[];
            let sql = "select * from CATEGORIA";
            let result = await BD.Open(sql,[],false);
            result.rows.map((publi: any[]) => {
                let userSchema = {
                    "nombre": publi[0]
                }
                Categoria.push(userSchema);
            });
            res.json(Categoria);
        });


        this.router.post('/comentario',async(req,res)=>{
            console.log(req.body);
            let sql = "INSERT INTO COMENTARIOS(autor,descripcion,id_publicacion) VALUES(";
            sql+="'"+req.body.autor+"','"+req.body.descripcion+"',"+req.body.id_publicacion+")";

            try {
                let result = await BD.Open(sql, [], true);
                console.log(result);
                let response = { status: "EXITO2" };
                res.json(response);
            } catch (error) {
                let response = { status: "ERROR2" };
                res.json(response);
            }
        });

        this.router.post('/loscomentario',async(req,res)=>{
            console.log(req.body);
            let Comentario :{autor:any;descripcion:any;fecha:any}[]=[];
            let sql = "select * from COMENTARIOS where id_publicacion=";
            sql+=req.body.id_publicacion +"order by id_comentario asc";
            let result = await BD.Open(sql,[],false);
            result.rows.map((publi: any[]) => {
                let userSchema = {
                    "autor": publi[2],
                    "descripcion":publi[3],
                    "fecha":publi[1]
                }
                Comentario.push(userSchema);
            });
            res.json(Comentario);
        });



    }
}

const productoroutes = new productoRouter;
export default productoroutes.router;