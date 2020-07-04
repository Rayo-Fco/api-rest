import { Request, Response } from 'express';
import Category from '../Models/Category';
import Validar from '../Middlewares/joi'

export class CartController {
    constructor() {}
    
    public async getCart(req:Request, res:Response){ 
        return res.status(200).send("exito")
    }
}
export default new CartController()