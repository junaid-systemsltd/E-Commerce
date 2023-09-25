'use server';

// Libs
import Joi from 'joi';
import { cookies } from 'next/headers';

// Modules
import prisma from '@/core/utils/prisma';
import hasPassword from '@/core/utils/hashPassword';
import {
    validateLoginUser,
    validateProfileUpdateUser,
    validateRegisterUser,
} from '../validations/user.validation';
import extractFormData from '../utils/extractFormData';
import { ProfileUpdateFields, UserRegisterFields } from '@/types/user';

export async function registerAction(formData: FormData) {
    try {
        const data: UserRegisterFields = extractFormData(formData);

        const { error } = validateRegisterUser(data);

        if (error) {
            return { status: false, errors: error.details };
        }

        const user = await prisma.user.create({ data });

        if (user) {
            return {
                status: true,
                message: 'Successfully Logged in',
                user: user,
                errors: [],
            };
        }

        return {
            status: false,
            errors: [{ message: 'invalid input credentials' }],
        };
    } catch (e) {
        console.log(e);
        return { status: false, errors: [{ message: 'There was an error.' }] };
    }
}

export async function profileUpdateAction(formData: FormData) {
    try {
        const data: ProfileUpdateFields = extractFormData(formData);

        const { error } = validateProfileUpdateUser(data);

        if (error) {
            return { status: false, errors: error.details };
        }

        const { id, ...updateFields } = data;
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { ...updateFields },
        });

        console.log({ user });

        if (user) {
            cookies().set('user', JSON.stringify(user));
            return {
                status: true,
                message: 'Profile updated',
                user: exclude(user, ['password']),
                errors: [],
            };
        }
    } catch (e) {
        console.log(e);
        return { status: false, errors: [{ message: 'There was an error.' }] };
    }
}

export async function loginAction(formData: FormData) {
    try {
        const data = extractFormData(formData);
        const { email, password } = data;

        const { error } = validateLoginUser(data);

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
                message: 'Successfully Logged in',
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

export async function logoutAction() {
    cookies().delete('user');
}

function exclude(user: any, keys: string[]) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}
