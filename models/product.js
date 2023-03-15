import {Schema, model} from 'mongoose'

// const 

const ProductSchema = new Schema({
    name: {
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
    }]

})

export default model('Products', ProductSchema)