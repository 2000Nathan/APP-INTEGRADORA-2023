import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

// nuevo usuario en BD (POST) - /api/user - publico (cualquiera puede crear un usuario)
export const newUser = async (req: Request, res: Response) => {

    const {username, password} = req.body;

    //Validar si ya existe el usuario
    const user = await User.findOne({ where: { username: username } }) // es igual a SELECT * FROM users WHERE username = 'username'
    if (user) {
        res.status(400).json({
            msg: `El usuario ${username} ya existe`
        });
    }


    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        //Guardamos usuario en BD
        await User.create({
            username: username,
            password: hashedPassword
        
        })
        
        // Enviar respuesta
        res.json({
            msg: `Usuario ${username} creado correctamente!`,
            
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'Error al crear el usuario',
            error
        });
    }
    
}
// Login de usuario en BD (POST) - /api/user/login - publico (cualquiera puede crear un usuario)
export const loginUser = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    //Validar si ya existe el usuario en BD
    const user: any = await User.findOne({ where: { username: username } }) // es igual a SELECT * FROM users WHERE username = 'username'
    if (!user) {
        return res.status(400).json({
            msg: `El usuario ${username} no existe en la  base de datos`
        });
    }

    //Validamos password
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
        return res.status(400).json({
            msg: `La contraseña no es correcta!`
        });
    }


    //Generar (JWT token)
    const token = jwt.sign({ 
        username: user.username,
    }, process.env.SECRET_KEY || 'pepito123')

    res.json({token});

}