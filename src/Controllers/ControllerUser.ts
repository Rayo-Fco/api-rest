import { Request, Response } from 'express';
import User, { IUser }from '../Models/User';
import jwt from 'jsonwebtoken';
import config from '../Config'
import Bcrypt from 'bcrypt'
import Validar from '../Middlewares/joi'

export class UserController {
    constructor(){}

    public async LoginIn(req:Request, res:Response){
        console.log(req.body)
        const {error} = Validar.Login(req.body)
        if(error) return res.status(400).send({error: error.details})
        
        let Usuario = await User.findOne({ email: req.body.email})
        if (!Usuario) return res.status(400).json({ error: 'Email y/o Password incorrecto'});
        
        let ValidarPass = await Bcrypt.compare(req.body.password, Usuario.password)
        if (!ValidarPass) return res.status(400).json({ error: 'Email y/o Password incorrecto'});
        
        return res.status(200).send({ token: CreateToken(Usuario) })
    }

    public async RegisterUser(req:Request, res:Response){
        const {error} = Validar.Register(req.body)
        if(error) return res.status(400).send({error : error.details});

        let PreexitenciaEmail = await User.findOne({ email: req.body.email})
        if(PreexitenciaEmail) return res.status(400).send({ error: 'Email ya esta registrado'})
        
        let PreexitenciaRut = await User.findOne({ rut: req.body.rut})
        if(PreexitenciaRut) return res.status(400).send({ error: 'Rut ya esta registrado'})

        const ClaveEncriptada = await EncryptKey(req.body.password)

        const user = new User({
            rut: req.body.rut,
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            password: ClaveEncriptada,
        })

        await user.save((error)=>{
            if (error){
                return res.status(500).send( { error: `Error al crear el usuario: ${error}` })
            }
                return res.status(200).send({ token: CreateToken(user) })
        })
    }

}

function CreateToken(user:IUser){
    const token = jwt.sign({ 
        id: user.id, 
        email: user.email 
    }, 
    config.SECRET_TOKEN, 
    {
        algorithm: 'HS256', // Base de Codificacion
        expiresIn: '7 days', // Tiempo de Duracion
      });
    return token
}



async function  EncryptKey(password:String){
    const salt = await Bcrypt.genSalt(10)
    const EncryptedKey = await Bcrypt.hash(password, salt)
    return EncryptedKey
}

export default new UserController()