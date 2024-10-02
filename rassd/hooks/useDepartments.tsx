import { useState, useEffect } from 'react';
import { api } from "@/config/axios.config";
import { GroupType } from "@/rassd/types"; // You can change this import based on your project structure
import { toast } from "sonner";

interface CreateDepartmentDto {
    name: string;
    groupId: string; // Assuming you want to associate it with a group
}

interface UpdateDepartmentDto {
    name?: string;
    groupId?: string;
}

export const useDepartments = () => {
    const [departments, setDepartments] = useState<{
        id: number;
        name: string;
        groupId: string;
        terms: any[]
    }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all departments
    const fetchDepartments = async (page: number = 1, limit: number = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/departments', { params: { page, limit } });
            setDepartments(response.data.elements?.map((dept: any) => ({
                id: dept.id,
                name: dept.name,
                groupId: dept.group.id,
                terms: dept.terms
            }))); // Adjust this based on your API response structure
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Create a new department
    const createDepartment = async (departmentData: CreateDepartmentDto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/departments', departmentData);
            setDepartments((prev) => [...prev, response.data]);
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Update a department
    const updateDepartment = async ({ id, departmentData }: { id: number, departmentData: UpdateDepartmentDto }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.patch(`/departments/${id}`, departmentData);
            setDepartments((prev) => prev.map((dept) => (dept.id === id ? response.data : dept)));
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Delete a department
    const deleteDepartment = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/departments/${id}`);
            setDepartments((prev) => prev.filter((dept) => dept.id !== id));
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments(); // Fetch departments when the hook is first used
    }, []);

    return {
        departments,
        loading,
        error,
        fetchDepartments,
        createDepartment,
        updateDepartment,
        deleteDepartment,
    };
};
