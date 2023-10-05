'use server';
import prisma from '../utils/prisma';

export const fetchUsersList = async () => {
    const users = await prisma.user.findMany();

    return users;
};

export const fetchUserById = async (id: number) => {
    return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (
    id: number,
    data: { name: string; email: string; isAdmin: boolean },
) => {
    return await prisma.user.update({ where: { id }, data });
};
