import { Request, Response } from 'express';
import Category from '../Models/Category';
import Validar from '../Middlewares/joi'

export class CategoryController {
    constructor() {}
    
    public async getCategory(req:Request, res:Response){
        let categoria = await Category.find({},{_id:2,nombre:1})
        return res.status(200).send(categoria)
    }

    public async addCategory(req:Request, res:Response){
        const {error} = Validar.Category(req.body)
        if (error) return res.status(400).send({error: error.details})

        let categoria = req.body.categoria
        let Validar_Categoria = await Category.findOne({ nombre: categoria})
        if (Validar_Categoria) return res.status(400).json({ error: `La Categoria: ${Validar_Categoria.nombre} ya se encuentra registrada`});

        const objcategoria = new Category({
            nombre: categoria,
        })
        await objcategoria.save((error)=>{
            if(error) return res.status(500).send( { error: `Error al crear la categoria: ${error}` })

            return res.status(200).send({ mensaje: `La categoria: ${objcategoria.nombre} se ha guardado con exito`})
        })


    }
   

    

    
    
}



export default new CategoryController()







