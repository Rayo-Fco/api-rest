import { model, Schema, Document } from "mongoose";

export interface ICategory extends Document {
    nombre: string;
  };

const CategorySchema = new Schema({
    nombre:{
        type: String,
        unique: true,
        lowercase:true
        
    },
    fecha_registro:{
        type:Date,
        default:Date.now
    }

})

function a() {
    
}

export default model<ICategory>("Category", CategorySchema);