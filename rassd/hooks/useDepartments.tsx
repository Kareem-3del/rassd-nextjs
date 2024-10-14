import { useState, useEffect } from 'react';
import { api } from "@/config/axios.config";
import { GroupType } from "@/rassd/types"; // You can change this import based on your project structure
import { toast } from "sonner";
import { Term } from '@/types';

interface CreateDepartmentDto {
    name: string;
    groupId: number; 
    terms: Omit<Term, "id">[]
}

interface UpdateDepartmentDto {
    name?: string;
    groupId?: number;
    // terms?: Omit<Term, "id">[]
}

interface UpdateTermDto  extends Term {
}

export const useDepartments = () => {
    const [departments, setDepartments] = useState<{
        id: number;
        name: string;
        groupId: number;
        terms: any[]
        groupType: string
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
                terms: dept.terms,
                groupType: dept.group.type
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
            setDepartments((prev) => [...prev, {...response.data, groupId: response.data.group}]);
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
            console.log({departmentData})
            const response = await api.patch(`/departments/${id}`, departmentData);
            console.log({dRe: response})
            setDepartments((prev) => prev.map((dept) => (dept.id === id ? {...dept,...response.data.data, groupId: response.data.group,} : dept)));
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

    const addTerm = async (departmentId: number, termData: Omit<Term, "id">) => {
        console.log("addTerm")
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(`/departments/${departmentId}/add-term`, {
                name: termData.name,
                requiredFiles: termData.requiredFiles,
            });
            setDepartments((prev) => prev.map((dept) => (dept.id === departmentId ? {...dept, terms: [...dept.terms, response.data]} : dept)));
            return response.data.data.terms
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    }

    const updateTerm = async ({ departmentId, termData }: { departmentId: number ,termData: UpdateTermDto }) => {
        console.log("updateTerm", termData)
        setLoading(true);
        setError(null);
        try {
            const response = await api.patch(`/terms/${termData.id}`, {
                name: termData.name,
                requiredFiles: termData.requiredFiles,
            });
            console.log(response)
            setDepartments((prev) => prev.map((dept) => (dept.id === departmentId ? {...dept,...response.data, groupId: response.data.group,} : dept)));
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    }

    const deleteTerm = async (departmentId: number, termId: number) => {
        console.log("deleteTerm")
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/terms/${termId}`);
            setDepartments((prev) => prev.map((dept) => (dept.id === departmentId ? {...dept, terms: dept.terms.filter((term) => term.id !== termId)} : dept)));
        } catch (err) {
            toast.error("حدث مشكلة ما");
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDepartments(); // Fetch departments when the hook is first used
    }, []);

    return {
        departments,
        loading,
        error,
        addTerm,
        deleteTerm,
        updateTerm,
        fetchDepartments,
        createDepartment,
        updateDepartment,
        deleteDepartment,
    };
};
