// src/hooks/useFile.ts
import { useEffect, useState } from 'react';
import { api } from '@/config/axios.config';
import axios from "axios";

// Define the type for a file
interface File {
    id: string;
    name: string;
    // Add other relevant fields based on your API response
}

// Define the error type
interface ErrorResponse {
    message: string;
}

// Define the hook
export const useFile = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorResponse | null>(null);

    // Fetch files from the server
    const fetchFiles = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const response = await api.get<File[]>('/file', {
                params: { page, limit },
            });
            setFiles(response.data);
        } catch (err : any) {
            setError(err.response?.data || { message: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    // Upload a file
    const uploadFile = async (file: File | Blob) => {
        setLoading(true);
        try {
            const formData = new FormData();
            // Ensure 'file' is an instance of File or Blob
            if (file instanceof Blob) {
                formData.append('file', file);
            } else {
                throw new Error('Invalid file type');
            }

            await api.post('/file/upload', formData);
            fetchFiles(); // Refresh the file list after uploading
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data || { message: 'An error occurred' });
            } else {
                setError({ message: 'An unknown error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };

    // Delete a file
    const deleteFile = async (id: string) => {
        setLoading(true);
        try {
            await api.delete(`/file/${id}`);
            fetchFiles(); // Refresh the file list after deleting
        } catch (err : any) {
            setError(err?.response?.data || { message: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };


    // Load files when the hook is used
    useEffect(() => {
        fetchFiles();
    }, []);

    return {
        files,
        loading,
        error,
        uploadFile,
        deleteFile,
    };
};
