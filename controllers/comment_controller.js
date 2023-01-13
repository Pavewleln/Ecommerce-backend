import CommentModel from '../models/Comment.js'

export const createComment = async (req, res) => {
    try{
        const doc = new CommentModel({
            fullname: req.body.fullname,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            post: req.body.postId
        })
        console.log(doc)
        const comment = await doc.save()
        res.json(comment)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось оставить комментарий"
        })
    }
}
export const getAllComments = async (req, res) => {
    try{
        const comments = await CommentModel.find()
        res.json(comments)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить комментарии"
        })
    }
}