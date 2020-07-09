import {Router} from 'express'

import Routesadmin from './router.admin'
import Routesuser from './router.user'


import CtrlUser from '../Controllers/ControllerUser'
import CtrlProduct from '../Controllers/ControllerProduct';
import CtrlResetPassword from '../Controllers/ControllerResetPassword'
import CtrlCategory from '../Controllers/ControllerCategory'

const api = Router()


api.get('/')

api.use('/',Routesadmin)
api.use('/',Routesuser)



api.post('/registrar', CtrlUser.RegisterUser)
api.post('/login', CtrlUser.LoginIn)
api.post('/login/reset', CtrlResetPassword.SendLink) // enviar el correo de recuperacion
api.post('/login/reset_password', CtrlResetPassword.UpdatePassword)  // validar password y cambio de la misma
api.get('/login/reset_password', CtrlResetPassword.ResetPassword) // ingresar a la url


 
api.get('/productos', CtrlProduct.getProductsAll) 
api.get('/productos/:id',CtrlProduct.getProductsCod)





api.get('/categoria/:categoria', CtrlProduct.getProductsCtg)
api.get('/categorias', CtrlCategory.getCategory)




export default api;
