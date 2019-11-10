import Validator from "validator";
import Helper from "../../../utils/helper"
import ErrorObject from "../error"
const isEmpty = Helper.isEmpty

const validateLogin = (data) => {
    let errors: ErrorObject = {};
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must have 6 chars'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateLogin
