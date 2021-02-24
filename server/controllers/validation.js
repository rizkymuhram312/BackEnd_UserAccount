// const { check, validationResult } = require('express-validator')


// exports.runValidation = (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(404).json({
//             status : false,
//             message: errors.array()[0].msg
//         })
//     }
//     next()
// }