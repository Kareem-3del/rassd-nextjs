"use client"
import { api } from '@/config/axios.config';
import { User } from '@/interfaces';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';


type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    error: string | null;
    refetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchCurrentUser = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await api.get("/auth/current-user");
            console.log(response)

            if (response.status === 401) {
            //    router.push( '/auth/login');
                return;
            }

        
            setUser(response.data);
            
        } catch (error) {
            console.error('Error fetching user:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            router.push( '/auth/login');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const refetchUser = async () => {
        await fetchCurrentUser();
    };

    const value = {
        user,
        setUser,
        isLoading,
        error,
        refetchUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
/*    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }*/
    return context as UserContextType;
}