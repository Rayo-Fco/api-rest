import {Router} from 'express'
import CtrlUser from '../Controllers/ControllerUser'
import CtrlProduct from '../Controllers/ControllerProduct';
import CtrlResetPassword from '../Controllers/ControllerResetPassword'
 

const api = Router()


api.get('/',(req, res, next)=>{
    console.log('entro')
    res.status(200).send({ 
        mensaje: 'entro'
    })
})

api.post('/registrar', CtrlUser.RegisterUser)
api.post('/login', CtrlUser.LoginIn)
api.post('/login/reset', CtrlResetPassword.SendLink)
api.post('/login/reset_password', CtrlResetPassword.ResetPassword)

 
api.get('/productos', CtrlProduct.getProducts)
api.post('/productos/agregar',  CtrlProduct.addProduct)
api.put('/productos/:id',  CtrlProduct.updateStock)
api.delete('/productos/:id',  CtrlProduct.deleteProduct)


export default api;
