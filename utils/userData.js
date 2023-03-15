export const newUserData = (user) => {
    return {_id: user._id, name: user.name, surname: user.surname, phone: user.phone, email: user.email, isAdmin: user.isAdmin, isActivated: user.isActivated}
}