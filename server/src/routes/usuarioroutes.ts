import { response, Router } from 'express';
import * as bcryptjs from 'bcryptjs';
import * as nodemailer from 'nodemailer';
const BD = require('../config/configbd');


class usuarioRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', async (req, res) => {
            let sql = "select * from USUARIO where correo=";
            sql += "'" + req.body.correo + "' and status=1";
            let result = await BD.Open(sql, [], false);
            let userSchema = {
                "id_usuario": "",
                "nombre": "",
                "apellido": "",
                "correo": "",
                "contrasenia": "",
                "fecha_nacimiento": "",
                "tipo": "",
                "foto": "",
                "credito": "",
                "id_pais": "",
                "error": false
            }
            let numero = result.rows.length;
            result.rows.map((user: any[]) => {
                userSchema.id_usuario = user[0];
                userSchema.nombre = user[1];
                userSchema.apellido = user[2];
                userSchema.correo = user[3];
                userSchema.contrasenia = user[4];
                userSchema.fecha_nacimiento = user[5];
                userSchema.tipo = user[6];
                userSchema.foto = user[7];
                userSchema.credito = user[8];
                userSchema.id_pais = user[9];
            });

            if (numero > 0) {
                const resultadocon= bcryptjs.compareSync(req.body.contrasenia, userSchema.contrasenia);
                userSchema.error=resultadocon;
                res.json(userSchema);
            } else {
                console.log(userSchema);
                console.log('error no hay');
                res.json(userSchema);
            }

        });

        this.router.post('/usuario', async (req, res) => {

            let passw = req.body.contrasenia;
            let hast2 = bcryptjs.hashSync(passw, 10);
            //console.log('prueba a fuera');
            //console.log(hast2);
            let sql = "INSERT INTO USUARIO(nombre,apellido,correo,contrasenia,fecha_nacimiento,foto,id_pais) VALUES(";
            sql += "'" + req.body.nombre + "','" + req.body.apellido + "','" + req.body.correo + "','" + hast2 + "',TO_DATE('";
            sql += req.body.fecha_nacimiento + "','YYYY-MM-DD'),'" + req.body.fotografia + "'," + req.body.pais + ")";

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

        this.router.post('/usuario2', async (req, res) => {

            let passw = req.body.contrasenia;
            let hast2 ="";
            if (req.body.contrasenia.length<10){
                hast2 = bcryptjs.hashSync(passw, 10);
            }else{
                hast2=req.body.contrasenia;
            }
            
            //console.log('prueba a fuera');
            //console.log(hast2);
            let sql = "update USUARIO set nombre='"+req.body.nombre+"',apellido='"+req.body.apellido+"',contrasenia='"+hast2+"',";
            sql+="fecha_nacimiento=TO_DATE('"+req.body.fecha_nacimiento+"','YYYY-MM-DD'),foto='"+req.body.foto+"',id_pais="+req.body.id_pais
            sql+=" where correo='"+req.body.correo+"'";
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

        this.router.get('/prueba12', async (req, res) => {
            let sql = "select * from USUARIO ";
            let result = await BD.Open(sql, [], false);
            let Pais: { id_usuario: any; nombre: any; apellido: any; correo: any; contraseña: any }[] = [];
            result.rows.map((pass: any[]) => {
                let userSchema = {
                    "id_usuario": pass[0],
                    "nombre": pass[1],
                    "apellido": pass[2],
                    "correo": pass[3],
                    "contraseña": pass[4],
                    "status":pass[10]
                }
                Pais.push(userSchema);
            });

            res.json(Pais);
        });

        this.router.post('/imagenusuario', (req, res, next) => {
            //console.log(req.file);
            response: {
                status: "Exito"
            }
            res.end();
        })

        this.router.post('/confirmacion', (req, res, next) => {
            console.log(req.body);
            let usuario2 = req.body;
            this.enviarConfirmacion(usuario2.correo);
            res.end();
        })

        this.router.post('/verificarRegistro', async (req, res) => {
            //console.log(req.body.correo);
            //console.log(req.body);
            let sql = "update USUARIO set status=1 where correo='" + req.body.correo + "'";
            try {
                let result = await BD.Open(sql, [], true);
                let response = { status: "EXITO2" };
                res.json(response);
            } catch (error) {
                let response = { status: "ERROR3" };
                res.json(response);
            }
        });
    }

    async enviarConfirmacion(correo: any): Promise<void> {
        console.log(correo);
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'miaproyecto2020@gmail.com',
                pass: 'Mia12345'
            }
        });

        let info = {
            from: 'miaproyecto2020@gmail.com',
            to: correo,
            text: 'No Responder a Este Correo',
            subject: 'Confimacion De Su Cuenta',
            html: '<h1>Bienvenido a GT Sales</h1><p>Presionar el Boton para Confirmar su Registro</p>\
            <form method="" action="http://localhost:4200/succes?correo='+ correo + '">\
            <button type="submit" >Confirmar\
            </form>'
        }

        transporter.sendMail(info, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Exito envio mail');
            }

            transporter.close();
        });
    }

}

const usuarioroutes = new usuarioRoutes;
export default usuarioroutes.router;