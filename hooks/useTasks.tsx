import { useState } from "react";
import { api } from "@/config/axios.config";
import {Client, EstablishmentDetail, Task} from "@/rassd/types";

// Base API URL (replace with your actual API endpoint)
const API_URL = "/tasks";

const useTasks:any = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks with pagination
  const fetchTasks = async (query: any = {}): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get(API_URL, query);
      console.log(response);
      setTasks(response.data.elements);
    } catch (err) {
      setError("An error occurred while fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRejectedTasks = async (query: any = {}): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get("/tasks/tasks-rejected", query);
      console.log(response);
      setTasks(response.data.elements);
    } catch (err) {
      setError("An error occurred while fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComplitedTasks = async (query: any = {}): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get("/tasks/tasks-completed", query);
      console.log({response});
      setTasks(response.data.elements);
    } catch (err) {
      setError("An error occurred while fetching tasks.");
    } finally {
      setLoading(false);
    }
  };
  const fetchPendigTasks = async (query: any = {}): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get("/tasks/under-work", query);
      console.log({response});
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
        console.log('Fetched task:', response.data); // Log the fetched task
        setTask(response.data);
    } catch (err) {
        setError("An error occurred while fetching the task.");
        console.error(err); // Log the error for more details
    } finally {
        setLoading(false);
    }
};


  interface CreateTask {
    title: string;
    client: Client;
    establishmentDetail: EstablishmentDetail;
    departmentId: number;
    inspectorId: number;
  }

  // Create a new task
  const createTask = async (newTask: CreateTask): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<Task>(API_URL, newTask);
      if (tasks) {
        setTasks([...tasks, response.data]);
      }
    } catch (err) {
      setError('An error occurred while creating the task.');
    } finally {
      setLoading(false);
    }
  };
  // Update an existing task by ID
  const updateTask = async (
      id: number,
      updatedTask: Partial<Task>
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.put<Task>(`${API_URL}/${id}`, updatedTask);
      if (tasks) {
        setTasks(tasks.map((task) =>
            task.id === id ? response.data : task
        ));
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
        setTasks(tasks.filter((task) => task.id !== id));
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
    fetchRejectedTasks,
    fetchComplitedTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    fetchPendigTasks
  };
};

export default useTasks;
