import jwt from 'jsonwebtoken'
import tokenModel from "../models/token.js"

export const generateTokens = (payload) => {
    const accessToken = jwt.sign({ _id: payload._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ _id: payload._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

    return {
        accessToken,
        refreshToken
    }
}
export const saveToken = async (userId, refreshToken) => {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
}
export const removeToken = async (refreshToken) => {
    const tokenData = await tokenModel.deleteOne({ refreshToken })
    return tokenData
}
export const findToken = async (refreshToken) => {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
}

export const validationAccessToken = async (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        return userData
    } catch (err) {
        return null
    }
}
export const validationRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        return userData
    } catch (err) {
        return null
    }
}