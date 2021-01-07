const { check } = require("express-validator");

let validateRegister = () => {
    return [
        check("name", "Tên không được để trống!!").not().isEmpty(),
        check("name", "Tên người dùng ít nhất phải 3 ký tự!!").isLength({
            min: 3,
        }),
        check("email", "Email không được để trống!!").not().isEmpty(),
        check("email", "Email không hợp lệ!!").isEmail().normalizeEmail(),
        check("password", "Mật khẩu không được để trống!!").not().isEmpty(),
        check("password")
            .isLength({ min: 6 })
            .withMessage("Mật khẩu tối thiểu phải 6 ký tự!!")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
            .withMessage("mat khau phai co it nhat 1 ky tu hoa thuong"),
    ];
};

let validateSignin = () => {
    return [
        check("email", "Email không hợp lệ!!").isEmail(),
        check("password", "Mật khẩu tối thiểu phải 6 ký tự!!").isLength({ min: 6 }),
    ];
};

module.exports = {
    validateRegister: validateRegister,
    validateSignin: validateSignin
}