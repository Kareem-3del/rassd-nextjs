import { useState, useEffect } from "react";
import { api } from "@/config/axios.config";
import { GroupType } from "@/rassd/types";
import { toast } from "sonner";
import { Group } from "@/types";

interface CreateGroupDto {
  name: string;
  type: GroupType;
}

interface UpdateGroupDto {
  name?: string;
  type?: GroupType;
}

export const useGroups = (type: "secret" | "field" = "field") => {
  const [groups, setGroups] = useState<Group[]>([]); // Replace 'any' with the appropriate type
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all groups
  const fetchGroups = async (
    type: "secret" | "field" = "field",
    page: number = 1,
    limit: number = 10
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/groups", {
        params: {
          type:
            type === "field" ? GroupType.FIELD_VISIT : GroupType.SECRET_VISIT,
          page,
          limit,
        },
      });
      setGroups(response.data.elements); // Adjust this based on your API response structure
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
      const response = await api.post("/groups", groupData);
      setGroups((prev) => {
        // console.log('Previous groups:', prev);
        console.log("New group:", response.data);
        const updatedGroups = [...prev, response.data];
        console.log("New groups:", updatedGroups);

        return updatedGroups;
      });
    } catch (err) {
      setError("حدث مشكلة ما");
    } finally {
      setLoading(false);
    }
  };

  // Update a group
  const updateGroup = async ({
    id,
    groupData,
  }: {
    id: number;
    groupData: UpdateGroupDto;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/groups/${id}`, groupData);
      setGroups((prev) =>
        prev.map((group) => (group.id === id ? response.data.data : group))
      );
    } catch (err) {
      setError("حدث مشكلة ما");
    } finally {
      setLoading(false);
    }
  };

  // Delete a group
  const deleteGroup = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/groups/${id}`);

      setGroups((prev) => {
        const updatedGroups = prev.filter((group) => group.id !== id);
        return updatedGroups;
      });
    } catch (err) {
      setError("حدث مشكلة ما");
    } finally {
      setLoading(false);
    }
  };

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
