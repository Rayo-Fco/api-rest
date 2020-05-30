import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    nombre: string;
    apellido: string;
    rut:string;
    telefono: number,
    email: string;
    password: string;
  };

const UserSchema = new Schema({
    nombre:{
        type:String,
        required: true,
        lowercase:true,
        minlength: 4,
        maxlength: 40
    },
    apellido:{
        type:String,
        required: true,
        lowercase:true,
        minlength: 4,
        maxlength: 40
    },
    rut:{
        type:String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 30
    },
    telefono:{
        type:Number,
        required: true,
        trim: true,
        maxlength: 30
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        minlength:6,
        maxlength:120
    },
    password:{
        type:String,
        required:true,
        trim: true,
        minlength:6,
        maxlength:255
    },
    imagen_perfil:{
        type:String
    },
    fecha_actualizacion:{
        type:Date,
        default:Date.now
    },
    fecha_registro:{
        type:Date,
        default:Date.now
    }

})

export default model<IUser>("User", UserSchema);