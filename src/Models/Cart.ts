import { model, Schema, Document } from "mongoose";

export interface ICart extends Document {
    nombre: string;
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


    }

})

export default model<ICart>("Cart", CartSchema);