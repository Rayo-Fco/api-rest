import { Request, Response } from 'express';
import Product from '../Models/Products';
import Joi from '../Middlewares/joi'

export class ProductController {
    constructor() {}
    
    public async getProducts(req:Request, res:Response){
        let products = await Product.find()
        return res.status(200).send(products)
    }

    public async addProduct(req:Request, res:Response){
        const {error} = Joi.AgregarProductoValidacion(req.body)
        if(error) return res.status(400).send({error: error.details})

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

    public async updateStock(req:Request, res:Response){

        let validar_numero = req.params.id.match(/^[0-9]+$/)
        if(!validar_numero) return res.status(400).send({error: `El Producto:${req.params.id} es invalido`})

        const {error} = Joi.StockValidacion(req.body)
        console.log(error)
        if (error) return res.status(400).send({error: error.details})
        let cod_producto = parseInt(req.params.id)
        let Validar_Codigo = await Product.findOne({ codigo: cod_producto})
        if (!Validar_Codigo) return res.status(400).json({ error: `El Codigo: ${cod_producto} no se encuentra registrado`});
         
        await Product.findOneAndUpdate({codigo:cod_producto}, {
              stock: req.body.stock
          },(error)=>{
            if(error) return res.status(500).send( { error: `Error al actualizar el stock: ${error}` })
            return res.status(200).send({ mensaje: "Se a actualizado el stock"})
        
         }) 
    }
}

export default new ProductController()







