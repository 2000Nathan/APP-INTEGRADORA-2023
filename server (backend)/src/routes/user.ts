import { Router } from 'express';
import { loginUser, newUser } from '../controllers/user';

// Rutas de usuarios
const router = Router();

// Crear un nuevo usuario - publico y ruta publica 
router.post('/', newUser );
router.post('/login', loginUser );

export default router;