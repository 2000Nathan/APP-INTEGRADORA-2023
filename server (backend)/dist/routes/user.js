"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
// Rutas de usuarios
const router = (0, express_1.Router)();
// Crear un nuevo usuario - publico y ruta publica 
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser);
exports.default = router;
