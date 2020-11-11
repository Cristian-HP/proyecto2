"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs = __importStar(require("bcryptjs"));
const nodemailer = __importStar(require("nodemailer"));
const BD = require('../config/configbd');
class usuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sql = "select * from USUARIO where correo=";
            sql += "'" + req.body.correo + "' and status=1";
            let result = yield BD.Open(sql, [], false);
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
            };
            let numero = result.rows.length;
            result.rows.map((user) => {
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
                const resultadocon = bcryptjs.compareSync(req.body.contrasenia, userSchema.contrasenia);
                userSchema.error = resultadocon;
                res.json(userSchema);
            }
            else {
                console.log(userSchema);
                console.log('error no hay');
                res.json(userSchema);
            }
        }));
        this.router.post('/usuario', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let passw = req.body.contrasenia;
            let hast2 = bcryptjs.hashSync(passw, 10);
            //console.log('prueba a fuera');
            //console.log(hast2);
            let sql = "INSERT INTO USUARIO(nombre,apellido,correo,contrasenia,fecha_nacimiento,foto,id_pais) VALUES(";
            sql += "'" + req.body.nombre + "','" + req.body.apellido + "','" + req.body.correo + "','" + hast2 + "',TO_DATE('";
            sql += req.body.fecha_nacimiento + "','YYYY-MM-DD'),'" + req.body.fotografia + "'," + req.body.pais + ")";
            try {
                let result = yield BD.Open(sql, [], true);
                console.log(result);
                let response = { status: "EXITO2" };
                res.json(response);
            }
            catch (error) {
                let response = { status: "ERROR2" };
                res.json(response);
            }
        }));
        this.router.post('/usuario2', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let passw = req.body.contrasenia;
            let hast2 = "";
            if (req.body.contrasenia.length < 10) {
                hast2 = bcryptjs.hashSync(passw, 10);
            }
            else {
                hast2 = req.body.contrasenia;
            }
            //console.log('prueba a fuera');
            //console.log(hast2);
            let sql = "update USUARIO set nombre='" + req.body.nombre + "',apellido='" + req.body.apellido + "',contrasenia='" + hast2 + "',";
            sql += "fecha_nacimiento=TO_DATE('" + req.body.fecha_nacimiento + "','YYYY-MM-DD'),foto='" + req.body.foto + "',id_pais=" + req.body.id_pais;
            sql += " where correo='" + req.body.correo + "'";
            try {
                let result = yield BD.Open(sql, [], true);
                console.log(result);
                let response = { status: "EXITO2" };
                res.json(response);
            }
            catch (error) {
                let response = { status: "ERROR2" };
                res.json(response);
            }
        }));
        this.router.get('/prueba12', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sql = "select * from USUARIO ";
            let result = yield BD.Open(sql, [], false);
            let Pais = [];
            result.rows.map((pass) => {
                let userSchema = {
                    "id_usuario": pass[0],
                    "nombre": pass[1],
                    "apellido": pass[2],
                    "correo": pass[3],
                    "contraseña": pass[4],
                    "status": pass[10]
                };
                Pais.push(userSchema);
            });
            res.json(Pais);
        }));
        this.router.post('/imagenusuario', (req, res, next) => {
            //console.log(req.file);
            response: {
                status: "Exito";
            }
            res.end();
        });
        this.router.post('/confirmacion', (req, res, next) => {
            console.log(req.body);
            let usuario2 = req.body;
            this.enviarConfirmacion(usuario2.correo);
            res.end();
        });
        this.router.post('/verificarRegistro', (req, res) => __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body.correo);
            //console.log(req.body);
            let sql = "update USUARIO set status=1 where correo='" + req.body.correo + "'";
            try {
                let result = yield BD.Open(sql, [], true);
                let response = { status: "EXITO2" };
                res.json(response);
            }
            catch (error) {
                let response = { status: "ERROR3" };
                res.json(response);
            }
        }));
    }
    enviarConfirmacion(correo) {
        return __awaiter(this, void 0, void 0, function* () {
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
            <form method="" action="http://localhost:4200/succes?correo=' + correo + '">\
            <button type="submit" >Confirmar\
            </form>'
            };
            transporter.sendMail(info, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Exito envio mail');
                }
                transporter.close();
            });
        });
    }
}
const usuarioroutes = new usuarioRoutes;
exports.default = usuarioroutes.router;
