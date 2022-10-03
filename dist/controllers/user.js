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
exports.deletUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json({
            users
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            return res.json({
                user
            });
        }
        res.status(404).json({
            msg: `Not user found with id: ${id}`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existEmail) {
            return res.status(500).json({
                msg: `User already exist qith this email: ${body.email}`
            });
        }
        const user = yield user_1.default.create(body);
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(500).json({
                msg: `Not user found with id: ${id}`
            });
        }
        yield user.update(body, {
            where: { id: id },
        });
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
});
exports.updateUser = updateUser;
const deletUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(500).json({
                msg: `Not user found with id: ${id}`
            });
        }
        //await user.destroy();
        yield user.update({ status: 0 }, {
            where: { id: id },
        });
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
});
exports.deletUser = deletUser;
//# sourceMappingURL=user.js.map