import {Router} from 'express'
import passport from 'passport'
import CtrlCart from '../Controllers/ControllerCart'

const api = Router()

api.get('/carrito/user',passport.authenticate('user',{ session:false }), CtrlCart.getCart)
api.post('/producto/:id',passport.authenticate('user',{ session:false }), CtrlCart.addProductCart)

export default api;