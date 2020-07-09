import { Router } from 'express'
import passport from 'passport'
import CtrlProduct from '../Controllers/ControllerProduct'
import CtrlCategory from '../Controllers/ControllerCategory'
import CtrlAdmin from '../Controllers/ControllerAdmin'


const api = Router()

// products
api.put('/productos/:id',passport.authenticate('admin',{ session:false }),  CtrlProduct.updateStock)
api.delete('/productos/:id',passport.authenticate('admin',{ session:false }),  CtrlProduct.deleteProduct)
api.post('/productos/agregar',passport.authenticate('admin',{ session:false }),  CtrlProduct.addProduct)

// Category
api.post('/categorias/agregar',passport.authenticate('admin',{ session:false }), CtrlCategory.addCategory)

// Admin

api.post('/admin/add',CtrlAdmin.RegisterAdmin)
api.post('/admin/login',CtrlAdmin.LoginIn)

export default api;