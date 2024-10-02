import { useState, useEffect } from 'react';
import {api} from "@/config/axios.config";
import {GroupType} from "@/rassd/types";
import {toast} from "sonner";


interface CreateGroupDto {
    name: string;
    type: GroupType;
}

interface UpdateGroupDto {
    name?: string;
    type?: GroupType;
}


export const useGroups = () => {
    const [groups, setGroups] = useState<any[]>([]); // Replace 'any' with the appropriate type
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all groups
    const fetchGroups = async (page: number = 1, limit: number = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/groups', { params: { page, limit } });
            setGroups(response.data); // Adjust this based on your API response structure
        } catch (err) {
            toast.error("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Create a new group
    const createGroup = async (groupData: CreateGroupDto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/groups', groupData);
            setGroups((prev) => [...prev, response.data]);
        } catch (err) {
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Update a group
    const updateGroup = async (id: string, groupData: UpdateGroupDto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.patch(`/groups/${id}`, groupData);
            setGroups((prev) => prev.map((group) => (group.id === id ? response.data : group)));
        } catch (err) {
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    // Delete a group
    const deleteGroup = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/groups/${id}`);
            setGroups((prev) => prev.filter((group) => group.id !== id));
        } catch (err) {
            setError("حدث مشكلة ما");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups(); // Fetch groups when the hook is first used
    }, []);

    return {
        groups,
        loading,
        error,
        fetchGroups,
        createGroup,
        updateGroup,
        deleteGroup,
    };
};
