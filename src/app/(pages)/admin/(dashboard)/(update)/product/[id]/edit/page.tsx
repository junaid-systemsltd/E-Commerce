'use client';

// Libs
import Link from 'next/link';
import { Form, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
// Modules
import pick from '@utils/pick';
import {
    fetchProduct,
    updateProduct,
    uploadProductImage,
} from '@services/products';
import useFetchPrisma from '@hooks/useFetchPrisma';
import Spinner from '@/components/elements/spinner';
import { FormContainer, SubmitButton } from '@/components/elements';
import toast from 'react-hot-toast';
import { UPLOAD_PRODUCT_IMAGE_ENDPOINT } from '@/constants/api-constants';
import axios from 'axios';
import extractFormData from '@/core/utils/extractFormData';

type EditProductProps = {
    params: {
        id?: string;
    };
    searchParams: {};
};

export default function EditProduct({ params: { id } }: EditProductProps) {
    const router = useRouter();
    // Fetching User from DB using user id
    const {
        data: product,
        error,
        isLoading,
    } = useFetchPrisma(fetchProduct, id);

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        image: '',
        brand: '',
        count_in_stock: 0,
        category: '',
        description: '',
    });
    const [image, setImage] = useState<File | undefined>();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        if (['price', 'count_in_stock'].includes(name)) {
            setFormData(prevState => ({ ...prevState, [name]: Number(value) }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const submitHandler = async () => {
        const data = { ...formData };
        try {
            if (image) {
                // Image Uploading
                const { message, status, file } = await uploadImageHandler(
                    image,
                );

                if (!status) return toast.error(message);

                console.log({ data });
                data['image'] = file;
            }

            console.log({ data }, '#');
            const res = await updateProduct(product.id, data);

            if (res) {
                toast.success('Updated Successfully.');
                router.refresh();
                router.replace('/admin/products');
            }
        } catch (e) {
            toast.error('Something went wrong!');
            console.error(e, '***    ERROR      *****');
        }
    };

    useEffect(() => {
        if (product) {
            setFormData(
                pick(
                    product,
                    'name',
                    'price',
                    'image',
                    'brand',
                    'count_in_stock',
                    'category',
                    'description',
                ),
            );
        }
    }, [product]);

    return (
        <>
            <Link href="/admin/users" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>UPdate Product</h1>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <Form action={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={onChangeHandler}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={onChangeHandler}
                                ></Form.Control>
                            </Form.Group>

                            {image ? (
                                <Form.Group className="my-3">
                                    <Form.Label>Image:</Form.Label>
                                    <div className="position-relative">
                                        <button
                                            type="button"
                                            className="position-absolute top-0 end-0  btn bg-transparent"
                                            onClick={() => setImage(undefined)}
                                        >
                                            <i
                                                className="fas fa-times"
                                                style={{
                                                    color: 'red',
                                                    fontSize: '1em',
                                                }}
                                            />
                                        </button>

                                        <Image
                                            fluid
                                            src={URL.createObjectURL(image)}
                                            alt={image.name}
                                        ></Image>
                                    </div>
                                </Form.Group>
                            ) : (
                                <Form.Group controlId="image">
                                    <Form.Label>Image:</Form.Label>
                                    <Form.Control
                                        type="file"
                                        placeholder="Enter image"
                                        accept="image/*"
                                        onChange={(e: any) =>
                                            setImage(e.target.files[0])
                                        }
                                    ></Form.Control>
                                </Form.Group>
                            )}

                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="brand"
                                    placeholder="Enter brand"
                                    value={formData.brand}
                                    onChange={onChangeHandler}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="countInStock">
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="count_in_stock"
                                    placeholder="Enter countInStock"
                                    value={formData.count_in_stock}
                                    onChange={onChangeHandler}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    placeholder="Enter category"
                                    value={formData.category}
                                    onChange={onChangeHandler}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    placeholder="Enter description"
                                    value={formData.description}
                                    onChange={onChangeHandler}
                                ></Form.Control>
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

// Inline Helpers
async function uploadImageHandler(image: File) {
    const baseURL = process.env['NEXT_PUBLIC_BASE_URL'];
    const endpoint = baseURL + UPLOAD_PRODUCT_IMAGE_ENDPOINT;
    const data = new FormData();
    data.append('image', image);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };

    return await axios
        .post(endpoint, data, config)
        .then(res => res.data)
        .catch(e => e?.response?.data);
}
