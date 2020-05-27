import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
  };

const UserSchema = new Schema({
    usuario:{
        type:String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        minlength: 4,
        maxlength: 30
    },
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