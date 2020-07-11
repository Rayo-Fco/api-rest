import { Request, Response } from 'express';
import Cart from '../Models/Cart';
import Validar from '../Middlewares/joi'
import Product from '../Models/Products';
import joi from '../Middlewares/joi';
import { ProductController } from './ControllerProduct';
import { Schema } from 'mongoose';
import { exist } from '@hapi/joi';

class CartController {
    constructor() {}
    
    public async getCart(req:Request, res:Response){ 
        if(req.user){
           
            console.log("entro");
             //@ts-ignore
            let carrito = await Cart.findOne({usuario: req.user._id},{_id:0}).populate('items.producto')

               return res.status(200).send(carrito)
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

                    let valida_carro = joi.Cart_Cantidad(req.body)
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
                                    if(producto.stock < (cart.cantidad + cantidad)) {
                                        c = true
                                    }
                                    else
                                    {
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
                            carro.total = (carro.total + (producto.precio * cantidad));
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
    
    public async updateProductCart(req:Request, res:Response){
        if(req.user){
            let validar_numero = req.params.id.match(/^[0-9]+$/)
            if(!validar_numero) return res.status(400).send({error: `El Producto:${req.params.id} es invalido`})
    
            const {error} = Validar.Cart_Cantidad(req.body)
            if (error) return res.status(400).send({error: error.details})
            
            let cod = parseInt(req.params.id)
            let producto = await Product.findOne({ codigo: cod})
            if(!producto) return res.status(400).send({ error: 'Error Producto no existe'})
            let cantidad = parseInt(req.body.cantidad)

            //@ts-ignore
            let carro = await Cart.findOne({ usuario: req.user._id });
            if(carro){
                    let c:boolean = false
                    let a:boolean = false
                    let precio_inicial:number = 0

                    carro.items.map((cart)=>{
                        if(cart.producto.toString() === producto?._id.toString())
                        {
                            if(producto.stock < cantidad) {
                                c = true
                            }
                            else
                            {
                                precio_inicial = cart.precio
                                cart.cantidad = cantidad
                                cart.precio = (producto.precio * cart.cantidad)
                            }
                        }
                        else
                        {
                           a = true
                           
                        }
                        return carro
                    })

                    if(a)  return res.status(400).send({ error:'Error  El producto no esta en el carro de compra'})
                    if(c)  return res.status(400).send({ error:'Error  La cantidad es mayor que el stock del producto'})


                    carro.total = (carro.total - precio_inicial + (producto.precio * cantidad));
                    carro.fecha_actualizacion = new Date(Date.now())
                    carro.save((err)=>{
                        if(err) return res.status(400).send({error:'Error al Actualizar el Producto del Carro de compras'});
                        return res.status(200).send({mensaje: 'Producto actualizado con exito'});
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

    public async deleteProductCart(req:Request, res:Response){
        if(req.user){
            let validar_numero = req.params.id.match(/^[0-9]+$/)
            if(!validar_numero) return res.status(400).send({error: `El Producto:${req.params.id} es invalido`})
            
            let cod = parseInt(req.params.id)
            let producto = await Product.findOne({ codigo: cod})
            if(!producto) return res.status(400).send({ error: 'Error Producto no existe'})
            let cantidad = parseInt(req.body.cantidad)

            //@ts-ignore
            let carro = await Cart.findOne({ usuario: req.user._id });
            if(carro){
                    let precio_producto:number = 0
                    let index:number = 0


                    carro.items.map((cart,index_map)=>{                  
                        console.log("entro map");                                                                                                                                         
                        if(cart.producto.toString() === producto?._id.toString())
                        {
                            precio_producto = cart.precio
                            index = index_map
                        }
                        return carro
                    })
                    if(precio_producto == 0)  return res.status(400).send({ error:'Error  El producto no esta en el carro de compra'})
                    carro.items.splice(index,1)
                    carro.total = (carro.total - precio_producto);
                    carro.save((err)=>{
                        if(err) return res.status(400).send({error:'Error al Actualizar el Producto del Carro de compras'});
                        return res.status(200).send({mensaje: 'Producto actualizado con exito'});
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