const Joi = require('joi');
const { failureResponse } = require('../utils/response');

const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return failureResponse(res, false, 400, errorMessages[0]);
        }
        req.body = value;
        next();
    };
};

module.exports = validate;