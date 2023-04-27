import {body} from "express-validator"


export const loginValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль дожен быть минимум 5 символов").isLength({min: 5}),
]

export const registerValidator = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль дожен быть минимум 5 символов").isLength({min: 5}),
    body('fullName', "Укажите имя").isLength({min: 3}),
    body('avatar', "Неврная ссылка на аватарку").optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', "Введите текст статьи").isLength({min: 3}).isString(),
    body('tags', "не верный формат тегов(укажите масив)").optional().isString(),
    body('imageUrl', "не верная ссылка на изображение").optional().isString(),
]