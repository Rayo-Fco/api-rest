import { Request, Response } from 'express';
import Cart from '../Models/Cart';
import Validar from '../Middlewares/joi'
import Product from '../Models/Products';
import joi from '../Middlewares/joi';
import { ProductController } from './ControllerProduct';

class CartController {
    constructor() {}
    
    public async getCart(req:Request, res:Response){ 
        if(req.user){
            //@ts-ignore
                let carro = await Cart.findOne({ usuario: req.user._id });
                if(carro)
                    {
                        
                    }
                    else
                    {
                        res.status(400).send({error:'Usuario Invalido'})
                    }
        }
        else
        {
            return res.status(400).send({ error:'Usuario invalido'})
        }
    }
   

    public async addProductCart(req:Request, res:Response){ 
        if(req.user){
                    let validar_numero = req.params.id.match(/^[0-9]+$/)
                    if(!validar_numero) return res.status(400).send({error: `El Producto:${req.params.id} es invalido`})
                    let cod = parseInt(req.params.id)

                    let valida_carro = joi.Cart(req.body)
                    if(valida_carro.error) return res.status(400).send({ error: valida_carro.error?.details})
                    
                    let producto = await Product.findOne({ codigo: cod})
                    if(!producto) return res.status(400).send({ error: 'Error Producto no existe'})
                    let cantidad = parseInt(req.body.cantidad)
                    //@ts-ignore
                   
                    let carro = await Cart.findOne({ usuario: req.user._id });
                    if(carro){
                            let a:boolean = false
                            let c:boolean = false
                            carro.items.map((cart)=>{
                                if(cart.producto.toString() === producto?._id.toString())
                                {
                                    if(producto.stock < (cart.cantidad +cantidad)) {
                                        c = true
                                    }
                                    else{
                                    cart.cantidad = cart.cantidad + cantidad
                                    cart.precio = (producto.precio * cart.cantidad)
                                    a = true
                                    }
                                }
                                return carro
                            })
                            if(c)  return res.status(400).send({ error:'Error  La cantidad es mayor que el stock del producto'})
                            if(!a)
                            {
                                if(producto.stock < cantidad) return res.status(400).send({ error:'Error  La cantidad es mayor que el stock del producto'})
                                carro.items.push({
                                    producto: producto?._id,
                                    precio: producto.precio * cantidad,
                                    cantidad: cantidad
                                });
                            }
                            carro.total = (carro.total + (producto.precio * parseInt(req.body.cantidad)));
                            carro.fecha_actualizacion = new Date(Date.now())
                            carro.save((err)=>{
                                if(err) return res.status(400).send({error:'Error al Agregar el Producto al Carro'});
                                return res.status(200).send({mensaje: 'Producto agregado con exito'});
                            });
                        }
                        else
                        {
                            res.status(400).send({error:'Usuario Invalido'})
                        }
            }
            else
            {
                return res.status(400).send({ error:'Usuario invalido'})
            }
    }
    
}
export default new CartController()