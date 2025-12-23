const Joi = require('joi');
const SignupValidate = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Validation failed", details: error.details });
    }
    next();
};

const LoginValidate = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Validation failed", details: error.details });
    }
    next();
};

module.exports = {
    SignupValidate,
    LoginValidate
};