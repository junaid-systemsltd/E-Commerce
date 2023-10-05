'use client';

// Libs
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Form } from 'react-bootstrap';
import { redirect, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
// Modules
import pick from '@utils/pick';
import { UserUpdate } from '@/types/user';
import useFetchPrisma from '@hooks/useFetchPrisma';
import Spinner from '@/components/elements/spinner';
import { fetchUserById, updateUser } from '@services/users.service';
import { FormContainer, Message, SubmitButton } from '@/components/elements';
import { revalidatePath, revalidateTag } from 'next/cache';

type EditUserProps = {
    params: {
        id?: string;
    };
    searchParams: {};
};

export default function EditUser({ params: { id } }: EditUserProps) {
    const router = useRouter();
    // Fetching User from DB using user id
    const {
        data: user,
        error,
        isLoading,
    } = useFetchPrisma(fetchUserById, Number(id));

    // Form data which will update
    const [formData, setFormData] = useState<UserUpdate>({
        name: '',
        email: '',
        isAdmin: false,
    });

    // Form onChange Handler
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.currentTarget;

        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'isAdmin' ? checked : value,
        }));
    };

    useEffect(() => {
        if (user) {
            setFormData(pick(user, 'email', 'isAdmin', 'name'));
        }
    }, [user]);

    // Submit Handler
    const submitHandler = async () => {
        const userId = (user && Number(user?.id)) || null;
        if (!userId) return toast.error('User not found');

        try {
            const res = await updateUser(userId, formData);
            if (res) {
                toast.success('Updated Successfully.');
                // revalidatePath('/admin/users');
                // revalidateTag('users'); // Update cached posts
                // redirect(`/admin/users/${id}`);
                router.refresh();
                router.back();
            }
        } catch (e) {
            toast.error('Something went wrong!');
        }
    };

    return (
        <>
            <Link href="/admin/users" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1> Edit User {id} </h1>
                {error && <Message variant="danger">{error.message}</Message>}
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <Form action={submitHandler}>
                            <Form.Group className="mt-3" controlId="name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={onChangeHandler}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="email">
                                <Form.Label>Email Address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={onChangeHandler}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="mt-3" controlId="isAdmin">
                                <Form.Check
                                    type="checkbox"
                                    label="is Admin"
                                    name="isAdmin"
                                    checked={formData.isAdmin}
                                    onChange={onChangeHandler}
                                ></Form.Check>
                            </Form.Group>

                            <SubmitButton
                                btnText="Update"
                                loadingText="Updating"
                            />
                        </Form>
                    </>
                )}
            </FormContainer>
        </>
    );
}
