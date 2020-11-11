"use strict";
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
const BD = require('../config/configbd');
class productoRouter {
    constructor() {
        this.catalogo = [];
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/producto', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let sql = "INSERT INTO PUBLICACION(nombre,detalle_producto,precio,fotoproducto,id_usuario,categoria) VALUES(";
            sql += "'" + req.body.nombre + "','" + req.body.detalle_producto + "'," + req.body.precio + ",'" + req.body.fotoproducto + "'," + req.body.id_usuario + ",'" + req.body.categoria + "')";
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
        this.router.post('/palabra', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let sql = "INSERT INTO PALABRASCLAVES(palabra,id_producto) VALUES(";
            sql += "'" + req.body.palabra + "'," + req.body.id_publicacion + ")";
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
        this.router.post('/palabraclave', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let PALABRA = {
                palabras: ""
            };
            let sql = "select palabra from PALABRASCLAVES where id_producto=";
            sql += req.body.id_publicacion;
            let result = yield BD.Open(sql, [], false);
            let palabraclave = "";
            result.rows.map((palabras) => {
                palabraclave += palabras[0] + ",";
            });
            PALABRA.palabras = palabraclave;
            //console.log(PALABRA);
            res.json(PALABRA);
        }));
        this.router.get('/ultimopro', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sql = "select max(id_publicacion) from PUBLICACION";
            let result = yield BD.Open(sql, [], false);
            result.rows.map((publi) => {
                let userSchema = {
                    "id_publicacion": publi[0]
                };
                console.log(userSchema);
                res.json(userSchema);
            });
        }));
        this.router.get('/producto', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let Catalogo = [];
            let sql = "select * from PUBLICACION where status=1";
            let result = yield BD.Open(sql, [], false);
            result.rows.map((publi) => {
                let userSchema = {
                    "id_publicacion": publi[0],
                    "nombre": publi[1],
                    "precio": publi[3],
                    "fotoproducto": publi[4],
                    "id_usuario": publi[5],
                    "categoria": publi[6],
                    "detalle": publi[2]
                };
                Catalogo.push(userSchema);
            });
            res.json(Catalogo);
        }));
        this.router.get('/categoria', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let Categoria = [];
            let sql = "select * from CATEGORIA";
            let result = yield BD.Open(sql, [], false);
            result.rows.map((publi) => {
                let userSchema = {
                    "nombre": publi[0]
                };
                Categoria.push(userSchema);
            });
            res.json(Categoria);
        }));
        this.router.post('/comentario', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let sql = "INSERT INTO COMENTARIOS(autor,descripcion,id_publicacion) VALUES(";
            sql += "'" + req.body.autor + "','" + req.body.descripcion + "'," + req.body.id_publicacion + ")";
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
        this.router.post('/loscomentario', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let Comentario = [];
            let sql = "select * from COMENTARIOS where id_publicacion=";
            sql += req.body.id_publicacion + "order by id_comentario asc";
            let result = yield BD.Open(sql, [], false);
            result.rows.map((publi) => {
                let userSchema = {
                    "autor": publi[2],
                    "descripcion": publi[3],
                    "fecha": publi[1]
                };
                Comentario.push(userSchema);
            });
            res.json(Comentario);
        }));
    }
}
const productoroutes = new productoRouter;
exports.default = productoroutes.router;
