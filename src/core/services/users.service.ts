import prisma from '../utils/prisma';

export const fetchUsersList = async () => {
    const users = await prisma.user.findMany();

    return users;
};
