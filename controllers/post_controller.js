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
            tags: req.body.tags.split(","),
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
export const searchPostsByTag = async (req, res) => {
    try {
        const tag = req.params.tag
        const posts = await PostModel.find()
        const postsByTag = []
        for (const post of posts){
            for (const t of post.tags){
                if (t === tag){
                    postsByTag.push(post)
                }
            }
        }
        res.json(postsByTag)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}
export const getAllPopular = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec()
        const popularPosts = posts.sort((a, b) => b.viewsCount - a.viewsCount);
        res.json(popularPosts)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}
export const getAllNew = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec()
        const newPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
        res.json(newPosts)
    } catch(err) {
        console.log(err)
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
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: 'after',
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'Не удалось вернуть статью',
            });
          }
  
          if (!doc) {
            return res.status(404).json({
              message: 'Статья не найдена',
            });
          }
  
          res.json(doc);
        },
      ).populate('user');
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить статьи',
      });
    }
  };
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
            tags: req.body.tags.split(","),
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