import {Router} from 'express'
import CtrlUser from '../Controllers/ControllerUser'
import CtrlProduct from '../Controllers/ControllerProduct';


const api = Router()


api.get('/',(req, res, next)=>{
    console.log('entro')
    res.status(200).send({ 
        mensaje: 'entro'
    })
})

api.post('/registrar', CtrlUser.RegisterUser)
api.post('/login', CtrlUser.LoginIn)

api.get('/productos', CtrlProduct.getProducts)
api.post('/productos/agregar',  CtrlProduct.addProduct)
api.put('/productos/:id',  CtrlProduct.updateStock)
api.delete('/productos/:id',  CtrlProduct.deleteProduct) 



export default api;