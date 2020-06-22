import { Request, Response } from 'express';
import Nodemail from '../Services/nodemail';
import config from '../Config'

export class MailController {
    constructor() {}

    public async send(req:Request, res:Response,){
        let datos = {
            nombre:"Pedro Gonzales",
            dominio: config.tienda.dominio,
            tienda: config.tienda.nombre
        }
        const mail = await Nodemail.SendMail("Francisco.grd@gmail.com","Recuperar Contraseña",datos,"ResetPassword")

        if(!mail) return res.status(400).send({error: 'Error al enviar el mensaje '})

        return res.status(200).send({mensaje: 'enviado'})
    }

    
}


export default new MailController()
 


