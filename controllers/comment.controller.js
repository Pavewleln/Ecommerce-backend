import CommentModel from '../models/comment.js'

export const create = async (req, res, next) => {
    try{
        const doc = new CommentModel({
            author: req.body.author,
            text: req.body.text,
            avatarUrl: req.body.avatarUrl,
            product: req.body.product
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