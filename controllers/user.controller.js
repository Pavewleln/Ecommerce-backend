import { registerService, loginService, logoutService, refreshService } from '../services/user.service.js'
import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import { findToken, validationRefreshToken } from '../services/token.service.js'

export const registration = async (req, res) => {
    try {
        const { email, password, phone, name, surname, avatarUrl, isAdmin} = req.body
        const userData = await registerService(name, surname, email, phone, avatarUrl, password, isAdmin)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.json(userData)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "Неверный логин или пароль",
                error: "invalid-email-or-password"
            })
        }
        const isValidpassword = await bcrypt.compare(password, user._doc.password)
        if (!isValidpassword) {
            return res.status(404).json({
                message: "Неверный логин или пароль",
                error: "invalid-email-or-password"
            })
        }
        user.isAdmin = isAdmin
        user.save()
        const userData = await loginService(user)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.json(userData)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось авторизоваться",
            error: error
        })
    }
}

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies
        const token = await logoutService(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(token)
    } catch (error) {
        console.log(e)
        res.status(404).json({
            message: "Ошибка",
            error: error
        })
    }
}
export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            return res.status(404).json({
                message: "Вы не авторизованы",
                error: "refresh-absent"
            })
        }
        const userData = validationRefreshToken(refreshToken)
        const tokenFromDB = await findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            return res.status(404).json({
                message: "Вы не авторизованы",
                error: "userData-or-tokenFromDB-absent"
            })
        }
        const userDataResponse = await refreshService(userData)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.json(userDataResponse)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Нет доступа",
            error
        })
    }
}


// Skwize: add User edit functions
export const edit = async (req, res) => {
    const {name, surname, email, phone, avatarUrl} = req.body
    const user = await UserModel.findById(req.userId)

    if (!user) return res.json({message: 'Пользователь не найден'})

    user.update({
        name: name || user.name,
        surname: surname || user.surname,
        email: email || user.email,
        phone: phone || user.phone,
        avatarUrl: avatarUrl || user.avatarUrl
    }).save()

    res.status(200).json({
        message: "Данные обновлены"
    })
}

