import CommentModel from '../models/comment.js'

export const create = async (req, res, next) => {
    const {text, avatarUrl, product, rating, author} = req.body
    try{
        const doc = new CommentModel({
            author,
            text,
            avatarUrl,
            product,
            rating: rating,
            authorId: req.userId
        })
        const comment = await doc.save()
        res.json(comment)
    } catch(error) {
        next(error)
    }
}
export const getAll = async (req, res, next) => {
    try{
        const comments = await CommentModel.find({product: req.params.id})
        res.json(comments)
    } catch(error) {
        next(error)
    }
}
export const remove = (req, res, next) => {
    try{
        CommentModel.findByIdAndDelete({
            _id: req.params.id
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Не удалось удалить комментарий!"
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Комментарий не найден!"
                })
            }
            res.json({
                success: true
            })
        })
    } catch(error) {
        next(error)
    }
}