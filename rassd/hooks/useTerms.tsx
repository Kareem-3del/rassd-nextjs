import { useState, useEffect } from 'react';
import { api } from "@/config/axios.config";
import { toast } from "sonner";

interface CreateTermDto {
    name: string; // Assuming this is a field for the term
}

interface UpdateTermDto {
    name?: string; // You can add other fields as necessary
}

export const useTerms = () => {
    const [terms, setTerms] = useState<any[]>([]); // Replace 'any' with the appropriate type
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all terms
    const fetchTerms = async (page: number = 1, limit: number = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/terms', { params: { page, limit } });
            setTerms(response.data); // Adjust this based on your API response structure
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Create a new term
    const createTerm = async (termData: CreateTermDto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/terms', termData);
            setTerms((prev) => [...prev, response.data]);
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Update a term
    const updateTerm = async (id: string, termData: UpdateTermDto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.patch(`/terms/${id}`, termData);
            setTerms((prev) => prev.map((term) => (term.id === id ? response.data : term)));
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Delete a term
    const deleteTerm = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/terms/${id}`);
            setTerms((prev) => prev.filter((term) => term.id !== id));
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTerms(); // Fetch terms when the hook is first used
    }, []);

    return {
        terms,
        loading,
        error,
        fetchTerms,
        createTerm,
        updateTerm,
        deleteTerm,
    };
};
