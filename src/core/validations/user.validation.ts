import { UserLoginFields, UserRegisterFields } from '@/types/user';
import Joi from 'joi';

const validationOption = {
    abortEarly: false,
};

export const validateLoginUser = (data: UserLoginFields) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(15).required(),
    });

    return schema.validate(data, validationOption);
};

export const validateRegisterUser = (data: UserRegisterFields) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(15).required(),
        confirmPassword: Joi.any()
            .equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .options({
                messages: { 'any.only': '{{#label}} must be same as Password' },
            }),
    });

    return schema.validate(data, validationOption);
};
