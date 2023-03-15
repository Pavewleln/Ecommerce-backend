import {body} from 'express-validator'

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),    
    body('password', 'Пароль должен содержать не менее 5 символов').isLength({min: 5})
]
export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),    
    body('password', 'Пароль должен содержать не менее 5 символов').isLength({min: 5}),    
    body('name', 'Укажите имя').isLength({min: 3}),
    body('surname', 'Укажите фамилию').isLength({min: 3}),
    body('phone', 'Неверный формат номера телефона').isMobilePhone()
]