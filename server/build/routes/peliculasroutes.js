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
class peliculasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/obtener', (req, res) => {
            res.send("esta es una peliculas");
        });
        this.router.get('/getU', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let sql = "select * from HOL5 ";
            let result = yield BD.Open(sql, [], false);
            let Users = [];
            result.rows.map((user) => {
                let userSchema = {
                    "NOMBRE": user[0],
                    "COD": user[1]
                };
                Users.push(userSchema);
            });
            res.json(Users);
        }));
    }
}
const peliculasroutes = new peliculasRoutes();
exports.default = peliculasroutes.router;
