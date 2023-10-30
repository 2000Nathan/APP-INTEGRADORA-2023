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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// nuevo usuario en BD (POST) - /api/user - publico (cualquiera puede crear un usuario)
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validar si ya existe el usuario
    const user = yield user_1.User.findOne({ where: { username: username } }); // es igual a SELECT * FROM users WHERE username = 'username'
    if (user) {
        res.status(400).json({
            msg: `El usuario ${username} ya existe`
        });
    }
    // Encriptar contraseña
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //Guardamos usuario en BD
        yield user_1.User.create({
            username: username,
            password: hashedPassword
        });
        // Enviar respuesta
        res.json({
            msg: `Usuario ${username} creado correctamente!`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error al crear el usuario',
            error
        });
    }
});
exports.newUser = newUser;
// Login de usuario en BD (POST) - /api/user/login - publico (cualquiera puede crear un usuario)
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validar si ya existe el usuario en BD
    const user = yield user_1.User.findOne({ where: { username: username } }); // es igual a SELECT * FROM users WHERE username = 'username'
    if (!user) {
        return res.status(400).json({
            msg: `El usuario ${username} no existe en la  base de datos`
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `La contraseña no es correcta!`
        });
    }
    //Generar (JWT token)
    const token = jsonwebtoken_1.default.sign({
        username: user.username,
    }, process.env.SECRET_KEY || 'pepito123');
    res.json({ token });
});
exports.loginUser = loginUser;
