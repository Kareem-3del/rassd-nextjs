'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

const TaskClientComponent = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, []);

    return null;
};

export default TaskClientComponent;