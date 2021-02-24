const { check, validationResult } = require('express-validator')


exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({
            status : false,
            message: errors.array()[0].msg
        })
    }
    next()
}

exports.validationDaftar = [
    check('user_name', 'username tidak boleh kosong').notEmpty(),
    check('user_email', 'email tidak boleh kosong').notEmpty(),
    check('user_password', 'password tidak boleh kosong').notEmpty()
]