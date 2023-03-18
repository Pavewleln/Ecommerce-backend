import ProductModel from "../models/product.js";

export const getAll = async (req, res, next) => {
    try {
        // console.log(req.query)
        // Получаем следуюшие данные
        // По ним надо фильтровать
        // {
        //     sort: 'newest',
        //     searchItem: 'Ыукс',
        //     page: '1',
        //     categories: [ 'apple', 'xiaomi', 'nokia' ],
        //     fromPrice: '209203',
        //     beforePrice: '20000'
        // }
        // Если fromPrice или beforePrice равны 0, то мы не берем их во внимание
        // Если categories равен пустому массиву, то мы не берем их во внимание
        // Если searchItem равен пустой строке, то мы не берем их во внимание
        // sort есть всегда - по умолчанию newest
        // page есть всегда - по умолчанию 1 - это пагинация
        const products = await ProductModel.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const create = async (req, res, next) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "Не корректный запрос",
                error: "Bad Request"
            })
        }

        const {title, description, price, photos, type, seller, kol} = req.body

        const newProduct = await ProductModel.create({
            title: title,
            description: description,
            price: price,
            seller: seller,
            kol: kol,
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

export const getById = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if(!product) {
            return res.status(400).json({
                message: "Продукт не найден",
                error: "product-is-not-defined"
            })
        }
        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}