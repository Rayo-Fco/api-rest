import { Request, Response } from 'express';
import Nodemail from '../Services/nodemail';
import config from '../Config'

export class MailController {
    constructor() {}

    

    public async ResetPassword(email:string,nombre:string,apellido:string,token:string):Promise<boolean>{

        let datos = {
            nombre: nombre+' '+apellido,
            url: config.tienda.dominio+"/login/reset_password?email="+email+'&token='+token,
            tienda: config.tienda.nombre
        }

        let correo:string = email
        let asunto:string = "Recuperar Contraseña"
        let template:string = "ResetPassword"

        const mail = await Nodemail.SendMail(correo,asunto,datos,template)
        return mail

    }
    public async UpdatePassword(email:string,nombre:string,apellido:string){

        let datos = {
            nombre: nombre+' '+apellido,
            tienda: config.tienda.nombre
        }

        let correo:string = email
        let asunto:string = "Contraseña Se Ha Actualizado!"
        let template:string = "UpdatePassword"

        const mail = await Nodemail.SendMail(correo,asunto,datos,template)

        return mail

    }
    

    
}


export default new MailController()
 


