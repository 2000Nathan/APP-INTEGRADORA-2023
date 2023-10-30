import { Router } from "express";
import { getProducts } from "../controllers/product";
import validateToken from "./validate_token";

// Rutas de productos
const router = Router();

// Obtener todos los productos - publico
router.get('/', validateToken, getProducts );

export default router;