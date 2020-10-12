"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class indexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send("hola desde routes index");
        });
        this.router.get('/hola1', (req, res) => {
            res.send("hola desde hola1 routes index");
        });
    }
}
const indexroutes = new indexRoutes();
exports.default = indexroutes.router;
