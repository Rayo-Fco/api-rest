import { Request, Response } from 'express';
import User, { IUser }from '../Models/User';
import jwt from 'jsonwebtoken';
import config from '../Config'
import Bcrypt from 'bcrypt'
import Joi from '../Middlewares/joi'

export class UserController {
    constructor(){}
    
    public async LoginIn(req:Request, res:Response){
        const {error} = Joi.LoginValidacion(req.body)
        if(error) return res.status(400).send({error: error.details})
        
        let Usuario = await User.findOne({ usuario: req.body.usuario})
        if (!Usuario) return res.status(400).json({ error: 'Usuario y/o Password incorrecto'});
        
        let ValidarPass = await Bcrypt.compare(req.body.password,Usuario.password)
        if (!ValidarPass) return res.status(400).json({ error: 'Usuario y/o Password incorrecto'});
        
        return res.status(200).send({ token: this.CreateToken(Usuario) })
    }

    public async RegisterUser(req:Request, res:Response){
        const {error} = Joi.RegistroValidacion(req.body)
        if(error) return res.status(400).send({error : error.details});

        let PreexitenciaUsuario = await User.findOne({ usuario: req.body.usuario})
        if(PreexitenciaUsuario) return res.status(400).send({ error: 'Usuario ya esta registrado'})

        let PreexitenciaEmail = await User.findOne({ email: req.body.email})
        if(PreexitenciaEmail) return res.status(400).send({ error: 'Email ya esta registrado'})
        
        const ClaveEncriptada = this.EncryptKey(req.body.password)

        const user = new User({
            usuario: req.body.usuario,
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            password: ClaveEncriptada,
        })
        await user.save((error)=>{
            if (error){
                return res.status(500).send( { error: `Error al crear el usuario: ${error}` })
            }
                return res.status(200).send({ token: this.CreateToken(user) })
        })
    }

    private CreateToken(user:IUser){
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

    private async EncryptKey(password:String){
        const salt = await Bcrypt.genSalt(10)
        const EncryptedKey = await Bcrypt.hash(password, salt)
        return EncryptedKey
    }
}

export default new UserController()