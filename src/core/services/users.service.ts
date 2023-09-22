export const fetchUsersList = async () => {
    await sleep(10000);
    return [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@example1.com',
            password: 'testing',
            isAdmin: true,
        },
        {
            id: 2,
            name: 'Junaid Ali',
            email: 'admin@example2.com',
            password: 'testing',
        },
        {
            id: 3,
            name: 'Moin uddin',
            email: 'admin@example3.com',
            password: 'testing',
        },
        {
            id: 4,
            name: 'Aniss Rehman',
            email: 'admin@example4.com',
            password: 'testing',
        },
    ];
};

const sleep = (delay: number) =>
    new Promise(resolve => setTimeout(resolve, delay));
