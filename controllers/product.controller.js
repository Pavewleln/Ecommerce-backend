import ProductModel from "../models/product.js";

export const getAll = async (req, res, next) => {
    try {
        const products = await ProductModel.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const newProduct = async (req, res, next) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "Не корректный запрос",
                error: "Bad Request"
            })
        }

        const {title, description, price, photos, type} = req.body

        const newProduct = await ProductModel.create({
            title: title,
            description: description,
            price: price,
            seller: req.user._id,
            $push: {
                photos: photos
            },
            type: type,
        })
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}