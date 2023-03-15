import ProductModel from "../models/product.js"

// Получаем ID продавца товара
async function getProductSeller (product) {
    if (!product) return null
    try {
        const productSeller = await ProductModel.findById(product, {seller: true})
        return productSeller
    } catch (error) {
        console.log(error)
    }
}


export default (req, res, next) => {
    if (req.method === "OPTIONS") next()

    try {
        const product_id = req.body.product_id || ""
        if (!req.user.isAdmin || getProductSeller(product_id) === req.user._id) return res.status(403).json({
            message: "Нет прав доступа"
        })
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}