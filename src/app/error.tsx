'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
        toast.error('Something went wrong');
    }, [error]);

    return (
        <div>
            <Alert variant="danger" dismissible>
                <Alert.Heading>Fetching Product</Alert.Heading>
                {error.message}
            </Alert>
            <div className="d-flex gap-2">
                <Button>Go Back</Button>
                <Button
                    variant="danger"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}
