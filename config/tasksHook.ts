import { useEffect, useState } from 'react';
import { api } from "./axios.config";

interface Tasks {
  all: string[];
  completed: string[];
  rejected: string[];
  underWork: string[];
}

export const useTasks = () => {
  const TASK_API_ENDPOINTS = {
    all: '/tasks',
    completed: '/tasks/completed',
    rejected: '/tasks/rejected',
    underWork: '/tasks/under-work',
  };

  const [tasks, setTasks] = useState<Tasks>({
    all: [],
    completed: [],
    rejected: [],
    underWork: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const [allTasksRes, completedTasksRes, rejectedTasksRes, underWorkTasksRes] = await Promise.all([
          api.get(TASK_API_ENDPOINTS.all),
          api.get(TASK_API_ENDPOINTS.completed),
          api.get(TASK_API_ENDPOINTS.rejected),
          api.get(TASK_API_ENDPOINTS.underWork),
        ]);

        setTasks({
          all: allTasksRes.data,
          completed: completedTasksRes.data,
          rejected: rejectedTasksRes.data,
          underWork: underWorkTasksRes.data,
        });
        setError(null); 
      } catch (error) {
        setError('Error fetching tasks.');
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTasks();
  }, []);

  return { tasks, setTasks, loading, error };
};
