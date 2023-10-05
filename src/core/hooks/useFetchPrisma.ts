'use client';
import { useEffect, useState } from 'react';

export default function useFetchPrisma(
    cb: any,
    params: any,
): { data: any; isLoading: boolean; error: any } {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await cb(params);
                if (result) {
                    setData(result);
                    setError(null);
                }
            } catch (e) {
                setData(null);
                setError(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { data, error, isLoading };
}
