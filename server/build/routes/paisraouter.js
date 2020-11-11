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
class paisRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/pais', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sql = "select * from PAIS ";
            let result = yield BD.Open(sql, [], false);
            let Pais = [];
            result.rows.map((pass) => {
                let userSchema = {
                    "id_pais": pass[0],
                    "nombre": pass[2]
                };
                Pais.push(userSchema);
            });
            res.json(Pais);
        }));
        this.router.post('/pais', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sql = "select nombre from PAIS where id_pais =";
            sql += req.body.id;
            let result = yield BD.Open(sql, [], false);
            result.rows.map((pass) => {
                let userSchema = {
                    "nombre": pass[0]
                };
                console.log(userSchema);
                res.json(userSchema);
            });
        }));
    }
}
const paisrouter = new paisRouter();
exports.default = paisrouter.router;
