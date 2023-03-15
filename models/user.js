import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    // Имя
    name: {
        type: String,
        required: true
    },
    // Фамилия
    surname: {
        type: String,
        required: true
    },
    // Почта
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Телефон
    phone: {
        type: String,
        required: true
    },
    // В данный момент зашел как пользователь(false) или как продавец(true)
    isAdmin: {
        type: Boolean,
        default: false
    },
    // Проверена ли почта
    isActivated: {
        type: Boolean,
        default: false
    },
    // Ссылка для проверки почты
    activationLink: {
        type: Boolean,
        default: false
    },
    // Пароль
    password: {
        type: String,
        required: true
    },
    // Аватар
    avatarUrl: String,
}, {
    timestamps: true
})

export default model("User", UserSchema)