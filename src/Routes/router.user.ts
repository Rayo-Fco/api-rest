import {Router} from 'express'
import passport from 'passport'
import CtrlCart from '../Controllers/ControllerCart'

const api = Router()

api.get('/carrito',passport.authenticate('user',{ session:false }), CtrlCart.getCart)

api.post('/producto/:id', passport.authenticate('user',{ session:false }) , CtrlCart.addProductCart)
api.put('/producto/:id', passport.authenticate('user',{ session:false }) , CtrlCart.updateProductCart)
api.delete('/producto/:id', passport.authenticate('user',{ session:false }) , CtrlCart.deleteProductCart)
export default api;