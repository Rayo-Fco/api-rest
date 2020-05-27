import { Request, Response, response } from 'express';
import Product, { IProduct }from '../Models/Products';
import Joi from '../Middlewares/joi'

export async function AgregarProducto(req:Request, res:Response){
        // validar parametros 
        const {error} = Joi.AgregarProductoValidacion(req.body)
        if(error) return res.status(400).send({error: error.details})
        // validar producto
        let Validar_Productos = await Product.findOne({ codigo: req.body.codigo})
        if (Validar_Productos) return res.status(400).json({ error: `El Producto: ${req.body.nombre} Codigo: ${req.body.codigo} ya se encuentra registrado`});
        const producto = new Product({
            nombre: req.body.nombre,
            stock: req.body.stock,
            codigo: req.body.codigo
        })
        await producto.save((error)=>{
            if(error) return res.status(500).send( { error: `Error al crear el Producto: ${error}` })
    
            return res.status(200).send({ mensaje: `El Producto: ${producto.nombre} se ha guardado con exito`})
       })
}

export async function ActualizarStock(req:Request, res:Response){
    let validar_numero = Number.isNaN(req.params.id as any)
    if(!validar_numero) return res.status(400).send({error: `El Producto:${req.params.id} es invalido`})
    const {error} = Joi.StockValidacion(req.body)
    if (error) return res.status(400).send({error: error.details})
    console.log(req.params.id)
    let cod_producto = parseInt(req.params.id)
    console.log(cod_producto)
    let Validar_Codigo = await Product.findOne({ codigo: cod_producto})
    if (!Validar_Codigo) return res.status(400).json({ error: `El Codigo: ${cod_producto} no se encuentra registrado`});
      await Product.findOneAndUpdate({codigo:cod_producto}, {
          stock: req.body.stock
      },(error)=>{
        if(error) return res.status(500).send( { error: `Error al actualizar el stock: ${error}` })
        res.status(200).send({ mensaje: "Se a actualizado el stock"})
     }) 
}



