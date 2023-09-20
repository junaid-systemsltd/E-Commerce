import { ReactNode } from 'react';

type Variants =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark';

interface MessageProps {
    variant?: Variants;
    children: ReactNode;
}

export default function Message({ variant = 'info', children }: MessageProps) {
    return (
        <div className={`alert alert-${variant}`} role="alert">
            {children}
        </div>
    );
}
