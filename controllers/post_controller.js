import PostModel from '../models/Post.js'
export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save()
        res.json(post)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось создать статью"
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            }, 
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            },
            (err, doc) => {
                if(err) {
                    console.log(e)
                    return res.status(500).json({
                        message: "Статья не найдена"
                    })
                }
                if(!doc) {
                    return res.status(404).json({
                        message: "Статья не найдена"
                    })
                }
                res.json(doc)
            }
        )
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findByIdAndDelete({
            _id: postId
        }, (err, doc) => {
            if(err) {
                console.log(e)
                return res.status(500).json({
                    message: "Не удалось удалить статью"
                })
            }
            if(!doc) {
                return res.status(404).json({
                    message: "Статья не найдена"
                })
            }
            res.json({
                success: true
            })
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось удалить статью"
        })
    }
}
export const update = async (req, res) => {
    try{
        const postId = req.params.id
        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.body.user,
            tags: req.body.tags,
        })

        res.json({
            success: true 
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось обновить статью"
        })
    }
}