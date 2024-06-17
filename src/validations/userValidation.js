const Joi = require('joi');

const userSignupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is a required field'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field'
    }).custom((value, helpers) => {
        return value.toLowerCase();
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    }),
    mobile: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.base': 'Mobile should be a type of text',
        'string.pattern.base': 'Please enter a valid 10-digit mobile number',
        'string.empty': 'Mobile cannot be an empty field',
        'any.required': 'Mobile is a required field'
    }),
    createdAt: Joi.date().default(() => new Date()).optional()
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field'
    }).custom((value, helpers) => {
        return value.toLowerCase();
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    })
})

const editProgileSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be an empty field',
        'string.min': 'Name should have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is a required field'
    }),
    mobile: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.base': 'Mobile should be a type of text',
        'string.pattern.base': 'Please enter a valid 10-digit mobile number',
        'string.empty': 'Mobile cannot be an empty field',
        'any.required': 'Mobile is a required field'
    })
});

const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    }),
});

const forgetPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be an empty field',
        'any.required': 'Email is a required field'
    }).custom((value, helpers) => {
        return value.toLowerCase();
    })
})

module.exports = {
    userSignupSchema,
    userLoginSchema,
    editProgileSchema,
    changePasswordSchema,
    forgetPasswordSchema
};
