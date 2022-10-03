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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.paths = {
            users: '/api/users'
        };
        this.port = process.env.PORT || '8081';
        this.app = (0, express_1.default)();
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //BODY PARSE
        this.app.use(express_1.default.json());
        //PUBLIC FOLDER
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.paths.users, user_1.default);
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('DB online');
            }
            catch (error) {
                throw new Error(`DB connectin error ${error}`);
            }
        });
    }
    init() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map