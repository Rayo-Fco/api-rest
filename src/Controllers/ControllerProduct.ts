import { Request, Response } from 'express';
import Product from '../Models/Products';
import Validar from '../Middlewares/joi'
import upload from '../Middlewares/multer'
import fs from 'fs'
import path from 'path'

export class ProductController {
    constructor() {}
    
    public async getProducts(req:Request, res:Response){
        let products = await Product.find()
        return res.status(200).send(products)
    }

    public async addProduct(req:Request, res:Response,){
        const cantidadfoto = 3;
        let CargaFotoProducto = upload.array('foto',cantidadfoto);
        CargaFotoProducto(req, res, async function (err)
        {
                // Validar Parametros //  
                if(err != undefined && err.code == 'LIMIT_UNEXPECTED_FILE') return res.status(400).send({ error: `Solo se pueden subir ${cantidadfoto} Fotos` })
                const {error} = Validar.Add_Product(req.body)

                if(error)
                {
                    if(!err) LimpiarTmp(req.files)
                    return res.status(400).send({error: error.details})
                }
                let Validar_Productos = await Product.findOne({ codigo: req.body.codigo})
                if (Validar_Productos)
                {
                    if(!err) LimpiarTmp(req.files)
                    return res.status(400).json({ error: `El Producto: ${req.body.nombre} Codigo: ${req.body.codigo} ya se encuentra registrado`});  
                }
                // Error de las Fotos //
                if (err != undefined && err.code == 'LIMIT_FILE_SIZE') return res.status(400).send({ error: 'El Archivo no puede superar los 5 MB'})
                fs.promises.mkdir(path.join(__dirname,'../Public/Products/')+req.body.codigo, { recursive: true })
                const foto = []
                for(let p of req.files)
                {
                    fs.createReadStream(path.join(__dirname,'../tmp/')+p.filename)
                    .pipe(fs.createWriteStream(path.join(__dirname,'../Public/Products/')+req.body.codigo+'/'+p.filename)) 
                    fs.unlink(path.join(__dirname,'../tmp/')+p.filename, function (err) {}); 
                    foto.push(path.join(__dirname,'../Public/Products/'+req.body.codigo+'/')+p.filename)
                }
                //Guardar el Producto//
                const producto = new Product({
                    nombre: req.body.nombre,
                    stock: req.body.stock,
                    codigo: req.body.codigo,
                    fotos:foto
                })
                await producto.save((error)=>{
                    if(error) return res.status(500).send( { error: `Error al crear el Producto: ${error}` })

                    return res.status(200).send({ mensaje: `El Producto: ${producto.nombre} se ha guardado con exito`})
                })

        })
    }

    public async updateStock(req:Request, res:Response){

        let validar_numero = req.params.id.match(/^[0-9]+$/)
        if(!validar_numero) return res.status(400).send({error: `El Producto:${req.params.id} es invalido`})

        const {error} = Validar.Stock_Product(req.body)
        console.log(error)
        if (error) return res.status(400).send({error: error.details})
        let cod_producto = parseInt(req.params.id)
        let Validar_Codigo = await Product.findOne({ codigo: cod_producto})
        if (!Validar_Codigo) return res.status(400).json({ error: `El Codigo: ${cod_producto} no se encuentra registrado`});
         
        await Product.findOneAndUpdate({codigo:cod_producto}, {
              stock: req.body.stock,
              fecha_actualizacion: Date.now()
          },(error)=>{
            if(error) return res.status(500).send( { error: `Error al actualizar el stock: ${error}` })
            return res.status(200).send({ mensaje: "Se a actualizado el stock"})
        
         }) 
    }

    public async deleteProduct(req:Request, res:Response){
        let validar_numero = req.params.id.match(/^[0-9]+$/)
        if(!validar_numero) return res.status(400).send({error: `El Producto:${req.params.id} es invalido`})

        let cod_producto = parseInt(req.params.id)
        let Validar_Codigo = await Product.findOne({ codigo: cod_producto})
        if (!Validar_Codigo) return res.status(400).json({ error: `El Codigo: ${cod_producto} no se encuentra registrado`});
        
        await Product.findByIdAndRemove(Validar_Codigo._id,(error)=>{
          if(error) return res.status(500).send( { error: `Error al eliminar el Producto: ${error}` })
          fs.promises.rmdir(path.join(__dirname,'../Public/Products/')+cod_producto, { recursive: true }); 
          return res.status(200).send({ mensaje: "Se a eliminado el Producto"})
      
       }) 
    }
    
}

async function  LimpiarTmp(nombrearchivo:any) 
{
    let bo:boolean = false
    if(nombrearchivo){
        for (let a=0; a< nombrearchivo.length; a++)
        {
            await fs.unlink(path.join(__dirname,'../tmp/')+nombrearchivo[a].filename, function (err) {
                if (err) console.log('Error LimpiarTMP: '+err)
            }); 
            bo = true;
        }
        if(bo)console.log('Se ha limpiado los TMP!');
    }
}

export default new ProductController()







