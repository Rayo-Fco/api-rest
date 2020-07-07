import {Router} from 'express'
import CtrlUser from '../Controllers/ControllerUser'
import CtrlProduct from '../Controllers/ControllerProduct';
import CtrlResetPassword from '../Controllers/ControllerResetPassword'
import CtrlMail from '../Controllers/ControllerMail'
import CtrlCategory from '../Controllers/ControllerCategory'
import CtrlCart from '../Controllers/ControllerCart'

import passport from 'passport'

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

api.post('/login/reset_password', CtrlResetPassword.UpdatePassword)  // validar password y cambio de la misma
api.get('/login/reset_password', CtrlResetPassword.ResetPassword) // ingresar a la url

api.get('/send', CtrlMail.send)
 
api.get('/productos', CtrlProduct.getProducts)
api.get('/productos/:id',CtrlProduct.getProductsCod)
api.post('/productos/agregar',passport.authenticate('admin',{ session:false }),  CtrlProduct.addProduct)

api.get('/categoria/:categoria', CtrlProduct.getProductsCtg)


api.get('/productos/:id',CtrlProduct.getProductsCod)
api.put('/productos/:id',passport.authenticate('admin',{ session:false }),  CtrlProduct.updateStock)
api.delete('/productos/:id',passport.authenticate('admin',{ session:false }),  CtrlProduct.deleteProduct)

api.get('/categorias', CtrlCategory.getCategory)
api.post('/categorias/agregar',passport.authenticate('admin',{ session:false }), CtrlCategory.addCategory)


api.get('/carro',passport.authenticate('user',{ session:false }), CtrlCart.getCart)


export default api;
