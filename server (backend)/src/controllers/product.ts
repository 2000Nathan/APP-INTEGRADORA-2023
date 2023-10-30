import { Request, Response } from 'express';
import { Product } from '../models/product';

// nuevo usuario en BD (POST) - /api/user - publico (cualquiera puede crear un usuario)
export const getProducts = async (req: Request, res: Response) => {
    const listproducts = await Product.findAll();


    res.json(listproducts);
}