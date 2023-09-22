'use client';

import { Button } from 'react-bootstrap';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

type SubmitButtonProps = {
    btnText: string;
    loadingText?: string;
};

export default function SubmitButton({
    btnText,
    loadingText,
}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button
            className="my-3 w-100"
            type="submit"
            variant="primary"
            disabled={pending}
        >
            {pending ? loadingText : btnText}
        </Button>
    );
}
