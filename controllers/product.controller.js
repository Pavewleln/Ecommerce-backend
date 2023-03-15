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