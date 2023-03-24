import bcrypt from 'bcrypt'
import UserModel from '../models/user.js'
import { newUserData } from '../utils/userData.js'
import { generateTokens, removeToken, saveToken } from "./token.service.js"

export const registerService = async (name, surname, email, phone, avatarUrl, password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await UserModel.create({
        name,
        surname,
        email,
        phone,
        avatarUrl,
        password: hash
    })
    const newUser = newUserData(user)
    const tokens = generateTokens(newUser)
    await saveToken(newUser._id, tokens.refreshToken)
    return {
        ...tokens,
        user: newUser
    }
}
export const loginService = async (user) => {
    const newUser = newUserData(user)
    const tokens = generateTokens(newUser)
    await saveToken(newUser._id, tokens.refreshToken)
    return {
        ...tokens,
        user: newUser
    }
}
export const logoutService = async (refreshToken) => {
    const token = await removeToken(refreshToken)
    return token
}
export const refreshService = async (userData) => {
    const user = await UserModel.findOne({_id: userData._id})
    const newUser = newUserData(user)
    const tokens = generateTokens(newUser)
    await saveToken(newUser._id, tokens.refreshToken)
    return {
        ...tokens,
        user: newUser
    }
}