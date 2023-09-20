'use server';

// Libs
import Joi from 'joi';
import { cookies } from 'next/headers';

// Modules
import prisma from '@/core/utils/prisma';
import hasPassword from '@/core/utils/hashPassword';

export async function loginAction(formData: FormData) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(10).required(),
    });
    try {
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        const { error } = schema.validate(
            { email, password },
            { abortEarly: false },
        );

        if (error) {
            return { status: false, errors: error.details };
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                isAdmin: true,
                name: true,
                password: true,
            },
        });

        if (user && user.password === hasPassword(password)) {
            const updateUser = exclude(user, ['password']);
            cookies().set('user', JSON.stringify(updateUser));

            return {
                status: true,
                message: 'You are successfully logged in',
                user: updateUser,
                errors: [],
            };
        }
        return { status: false, errors: [{ message: 'invalid credentials' }] };
    } catch (e) {
        console.log(e);
        return { status: false, errors: [{ message: 'There was an error.' }] };
    }
}

function exclude(user: any, keys: string[]) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}
