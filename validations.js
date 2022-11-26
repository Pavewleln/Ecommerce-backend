import {body} from 'express-validator'

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),    
    body('password', 'Пароль должен содержать не менее 5 символов').isLength({min: 5})
]
export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),    
    body('password', 'Пароль должен содержать не менее 5 символов').isLength({min: 5}),    
    body('fullname', 'Укажите имя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
]
export const postCreatValidator = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 3}).isString(),
    body('tags', 'Неверный формат тагов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
]