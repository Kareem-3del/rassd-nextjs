import { useState } from 'react';
import { api } from '@/config/axios.config';
import { Task } from '@/rassd/types';

// Base API URL (replace with your actual API endpoint)
const API_URL = '/tasks';

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all tasks with pagination
    const fetchTasks = async (query: any = {}): Promise<void> => {
        setLoading(true);
        try {
            const response = await api.get(API_URL, query);
            console.log(response)
            setTasks(response.data.elements);
        } catch (err) {
            setError("An error occurred while fetching tasks.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch a single task by ID
    const fetchTask = async (id: number): Promise<void> => {
        setLoading(true);
        try {
            const response = await api.get<Task>(`${API_URL}/${id}`);
            setTask(response.data);
        } catch (err) {
            setError("An error occurred while fetching the task.");
        } finally {
            setLoading(false);
        }
    };

    // Create a new task
    const createTask = async (newTask: Omit<Task, 'id'>): Promise<void> => {
        setLoading(true);
        try {
            const response = await api.post<Task>(API_URL, newTask);
            if (tasks) {
                setTasks({ ...tasks, data: [...tasks.data, response.data] });
            }
        } catch (err) {
            setError("An error occurred while creating the task.");
        } finally {
            setLoading(false);
        }
    };

    // Update an existing task by ID
    const updateTask = async (id: number, updatedTask: Partial<Task>): Promise<void> => {
        setLoading(true);
        try {
            const response = await api.put<Task>(`${API_URL}/${id}`, updatedTask);
            if (tasks) {
                setTasks({
                    ...tasks,
                    data: tasks.data.map((task) => (task.id === id ? response.data : task)),
                });
            }
        } catch (err) {
            setError("An error occurred while updating the task.");
        } finally {
            setLoading(false);
        }
    };

    // Delete a task by ID
    const deleteTask = async (id: number): Promise<void> => {
        setLoading(true);
        try {
            await api.delete(`${API_URL}/${id}`);
            if (tasks) {
                setTasks({
                    ...tasks,
                    data: tasks.data.filter((task) => task.id !== id),
                });
            }
        } catch (err) {
            setError("An error occurred while deleting the task.");
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        task,
        loading,
        error,
        fetchTasks,
        fetchTask,
        createTask,
        updateTask,
        deleteTask,
    };
};

export default useTasks;
