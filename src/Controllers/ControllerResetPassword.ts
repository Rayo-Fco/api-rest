import { Request, Response } from 'express';
import User, { IUser }from '../Models/User';
import jwt from 'jsonwebtoken';
import config from '../Config'
import Bcrypt from 'bcrypt'
import Validar from '../Middlewares/joi'

export class ResetPasswordController {
    constructor(){}

    public async SendLink(req:Request, res:Response){
        const {error} = Validar.SendLink(req.body)
        if(error) return res.status(400).send({error: error.details})
        
        let Usuario = await User.findOne({ email: req.body.email})
        if (!Usuario) return res.status(400).json({ error: 'Email no pertenece a nuestros registros'});
        
        if(!Usuario.fecha_resetpassword)
        {
            await User.updateOne(Usuario, {
                fecha_resetpassword: Date.now()
            },(error)=>{
              if(error) return res.status(500).send( { error: `Error al enviar el link: ${error}` })
           })
           return res.status(200).json({ token_reset: CreateToken(Usuario)}) 
           
        }
        else
        {
            let tiempo =((new Date().getTime())-Usuario.fecha_resetpassword.getTime()) / 1000 / 60
            if(tiempo > 3){
                await User.updateOne(Usuario, {
                    fecha_resetpassword: Date.now()
                },(error)=>{
                  if(error) return res.status(500).send( { error: `Error al enviar el link: ${error}` })
                })
                return res.status(200).json({ token_reset: CreateToken(Usuario)})
                
            }
            else return res.status(400).json({ error: 'Ya se le ha enviado el link a su correo tiene que esperar 3 min para enviar otro'}) 
        }
    }

    public async ResetPassword(req:Request, res:Response){
        if(!req.query.email || !req.query.token) return res.status(400).send({error: 'Link invalido o Ya ha expirado los 3 min'})
        
        const {error} = Validar.ResetPassword(req.query)
        if(error) return res.status(400).send({error: error.details})

        const valido =  VerifyToken(req.query.token)
        if(valido)
        {
            let decode:any = jwt.decode(req.query.token)
            if(decode.email === req.query.email)
            {
                if(req.body.password)
                {
                    const {error} = Validar.Password(req.body)
                    if(error) return res.status(400).send({error : error.details});

                    let Usuario = await User.findOne({ email: req.query.email})
                    if (!Usuario) return res.status(400).json({ error: 'Link invalido o Ya ha expirado los 3 min'});

                    const ClaveEncriptada = await EncryptKey(req.body.password)

                    await User.updateOne(Usuario,{
                            password: ClaveEncriptada,
                            fecha_actualizacion: Date.now()
                    },(error)=>
                    {
                        if(error) return res.status(500).send( { error: `Error al cambiar la clave: ${error}` })
                    })
                    return res.status(200).json({ mensaje: 'Se ha cambiado su clave! '}) 
                }
                return res.status(200).end()
            }
            return res.status(400).json({ error: 'Link invalido o Ya ha expirado los 3 min'});
        }
        else
        {
            return res.status(400).json({ error: 'Link invalido o Ya ha expirado los 3 min'});
        }
    }

}

function CreateToken(user:IUser){
    const token = jwt.sign({ 
        email: user.email 
    }, 
    config.SECRET_TOKEN, 
    {
        algorithm: 'HS256', // Base de Codificacion
        expiresIn: '3 minutes', // Tiempo de Duracion
      });
    return token
}

function VerifyToken(token:string) {
    let bo:boolean = false
    const valido =  jwt.verify(token,config.SECRET_TOKEN,(err, decoded)=> {
        if(!err)  bo = true
      });
      return bo
}

async function  EncryptKey(password:String){
    const salt = await Bcrypt.genSalt(config.Password_Salt)
    const EncryptedKey = await Bcrypt.hash(password, salt)
    return EncryptedKey 
}

export default new ResetPasswordController()