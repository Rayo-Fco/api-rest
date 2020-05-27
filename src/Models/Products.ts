import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
    nombre: string;
    codigo: number;
    stock: number;
  };

const ProductSchema = new Schema({
    nombre:{
        type:String,
        required: true,
        lowercase:true,
        minlength: 4,
        maxlength: 40
    },
    codigo:{
        type:Number,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 40
    },
    stock:{
        type:Number,
        required: true,
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

export default model<IProduct>("Product", ProductSchema);