import api from './api';

export const fetchTask = async (taskId: string) => {
  const response = await api.get<{ success: boolean; data: any }>(`/tasks/${taskId}`);
  return response.data.data;
};
