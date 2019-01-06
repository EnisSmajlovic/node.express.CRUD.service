/* eslint no-magic-numbers: 0 */
const Joi = require('joi');

function validateId(user) {
    const schema = {
        id : Joi.string()
            .guid({ version: 'uuidv4' })
            .required()
    };

    return Joi.validate(user, schema);
}

function validateQuery(user) {
    const schema = {
        start : Joi.number()
            .integer()
            .min(0)
            .max(255)
            .required(),
        rows  : Joi.number()
            .integer()
            .min(1)
            .max(255)
            .required()
    };

    return Joi.validate(user, schema);
}

function validateUser(user) {
    const schema = {
        email : Joi.string()
            .min(1)
            .max(255)
            .required(),
        givenName  : Joi.string()
            .min(1)
            .max(255)
            .required(),
        familyName  : Joi.string()
            .min(1)
            .max(255)
            .required()
    };

    return Joi.validate(user, schema);
}

module.exports.validateId = validateId;
module.exports.validateQuery = validateQuery;
module.exports.validateUser = validateUser;
