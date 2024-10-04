import { useState, useEffect } from "react";
import { User } from "@/interfaces";
import { api } from "@/config/axios.config";

interface CreateUserDto
  extends Pick<
    User,
    "email"
    | "firstName"
    | "lastName"
    | "role"
    | "phoneNumber"
    | "password"
    | "nationalId"
    | "sendLoginInfo"
  > {
  email: string;
  role: string;
  isTFAEnabled?: boolean;
  googleId?: string;
}

// Create a DTO for updating users
interface UpdateUserDto {
  email?: string;
  role?: string;
  isTFAEnabled?: boolean;
  googleId?: string;
}

// Define a hook for interacting with users API
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Base URL for the API endpoint
  const API_URL = "/users";

  // Fetch all users
  const fetchUsers = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    try {
      const response = await api.get<{elements: User[]}>(
        `${API_URL}?page=${page}&limit=${limit}`
      );
      setUsers(response.data.elements);
    } catch (err) {
      setError("حدث مشكلة الرجاء المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific user by ID
  const fetchUser = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.get<User>(`${API_URL}/${id}`);
      setUser(response.data);
    } catch (err) {
      setError("حدث مشكلة الرجاء المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const createUser = async (createUserDto: CreateUserDto) => {
    setLoading(true);
    try {
      const response = await api.post<User>(API_URL, createUserDto);
      console.log({
        response
      })
      if (users) {
        setUsers([...users, response.data]);
      }
    } catch (err) {
      setError("حدث مشكلة الرجاء المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing user
  const updateUser = async (id: string, updateUserDto: UpdateUserDto) => {
    setLoading(true);
    try {
      const response = await api.patch<User>(`${API_URL}/${id}`, updateUserDto);
      if (users) {
        setUsers(
          users.map((user) => (+user.id === +id ? response.data : user))
        );
      }
      setUser(response.data); // Optional, if you want to set the updated user as the current one
    } catch (err) {
      setError("حدث مشكلة الرجاء المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  };

  // Delete a user by ID
  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`${API_URL}/${id}`);
      if (users) {
        setUsers(users.filter((user) => +user.id !== +id));
      }
    } catch (err) {
      setError("حدث مشكلة الرجاء المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    user,
    loading,
    error,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
