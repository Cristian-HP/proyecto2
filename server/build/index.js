"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexroutes_1 = __importDefault(require("./routes/indexroutes"));
const peliculasroutes_1 = __importDefault(require("./routes/peliculasroutes"));
const paisraouter_1 = __importDefault(require("./routes/paisraouter"));
const usuarioroutes_1 = __importDefault(require("./routes/usuarioroutes"));
const productoroutes_1 = __importDefault(require("./routes/productoroutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
class server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 8080);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads')));
        //this.app.use('/uploads',express.static('uploads'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        const storege = multer_1.default.diskStorage({
            destination: path_1.default.join(__dirname, 'uploads'),
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });
        this.app.use(multer_1.default({
            storage: storege,
            dest: path_1.default.join(__dirname, 'uploads')
        }).single('userImage'));
    }
    routes() {
        this.app.use(indexroutes_1.default);
        this.app.use('/movie', peliculasroutes_1.default);
        this.app.use(paisraouter_1.default);
        this.app.use(usuarioroutes_1.default);
        this.app.use(productoroutes_1.default);
        //this.app.use('/uploads',express.static('uploads'));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor en el puerto: ", this.app.get('port'));
        });
    }
}
const servidor = new server();
servidor.start();
