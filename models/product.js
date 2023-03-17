import {Schema, model} from 'mongoose'


const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    kol: {
        type: Number,
        required: true
    },
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