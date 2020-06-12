import {Router} from 'express'
import CtrlProduct from '../Controllers/ControllerProduct';

const api = Router()

api.get('/productos', CtrlProduct.getProducts)
api.post('/productos/agregar',  CtrlProduct.addProduct)
api.put('/productos/:id',  CtrlProduct.updateStock)
api.delete('/productos/:id',  CtrlProduct.deleteProduct)