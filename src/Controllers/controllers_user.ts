import { Request, Response } from 'express';
import User, { IUser }from '../Models/User';
import jwt from 'jsonwebtoken';
import config from '../Config'
import Bcrypt from 'bcrypt'
import Joi from '../Middlewares/joi'

function CrearToken(user: IUser) {
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

export const IniciarSession = async (req : Request, res: Response) =>{
    // validar parametros login
    const {error} = Joi.LoginValidacion(req.body)
    if(error) return res.status(400).send({error: error.details})
    // validar usuario
    let Usuario = await User.findOne({ usuario: req.body.usuario})
    if (!Usuario) return res.status(400).json({ error: 'Usuario y/o Password incorrecto'});
    // comparar clave
    let ValidarPass = await Bcrypt.compare(req.body.password,Usuario.password)
    if (!ValidarPass) return res.status(400).json({ error: 'Usuario y/o Password incorrecto'});
    // crear token
     return res.status(200).send({ token: CrearToken(Usuario) })
      
}

export const RegistarUsuario = async (req : Request, res: Response) =>{
    //Validar parametros registro
    const {error} = Joi.RegistroValidacion(req.body)
    if(error) return res.status(400).send({error : error.details});

    //Validar Usuario
    let PreexitenciaUsuario = await User.findOne({ usuario: req.body.usuario})
    if(PreexitenciaUsuario) return res.status(400).send({ error: 'Usuario ya esta registrado'})

    //Validar Email
    let PreexitenciaEmail = await User.findOne({ email: req.body.email})
    if(PreexitenciaEmail) return res.status(400).send({ error: 'Email ya esta registrado'})
    
    //Encriptar Clave
    const salt = await Bcrypt.genSalt(10)
    const EncriptarClave = await Bcrypt.hash(req.body.password, salt)

    const user = new User({
        usuario: req.body.usuario,
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: EncriptarClave,
    })
    // guardar usuario
     await user.save((error)=>{
        if (error){
            return res.status(500).send( { error: `Error al crear el usuario: ${error}` })
        }
             return res.status(200).send({ token: CrearToken(user) })

    })
}

/*
export const ActualizarDatos = async (req : Request, res: Response) =>{
    // validar parametros actualizar
    const {error} = Joi.ActualizacionValidacion(req.body)
    if(error) return res.status(400).send({error: error.details})
    // validar email
    let Usuario = await User.findOne({ email: req.body.email})
    if (Usuario) return res.status(400).json({ error: 'Email ya se encuentra registrado'});
    // comparar clave

  //  let ValidarPass = await Bcrypt.compare(req.body.password,Usuario?.Password)
  //  if (!ValidarPass) return res.status(400).json({ error: 'Usuario y/o Password incorrecto'});
    // guardar datos
}
*/

