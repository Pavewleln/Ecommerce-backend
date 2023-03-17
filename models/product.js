import {Schema, model} from 'mongoose'


const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    photos: [{
        type: String
    }],
    type: {
        type: String,
        required: true
    }

})

export default model('Products', ProductSchema)