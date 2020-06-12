import { model, Schema, Document } from "mongoose";

export interface ICart extends Document {
    usuario: string;
    total: number;
    productos:[{ 
        nombre:Schema.Types.ObjectId,
        cantidad: number,
        precio: number
    }];
    fecha_actualizacion: Date;

  };

const CartSchema = new Schema({
    usuario:{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
	total: { 
        type: Number, 
        default: 0
    },
	productos:[{
		nombre: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product'
        },
		cantidad: { 
            type: Number, 
            default: 1
        },
		precio: { 
            type: Number, 
            default: 1
        },
    }],
    estado:{
        type: Boolean,
        required: true,
        default: true,
    },
    fecha_actualizacion:{
        type:Date,
        default:Date.now
    }

})

export default model<ICart>("Cart", CartSchema);