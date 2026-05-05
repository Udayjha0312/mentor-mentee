import api from './api';

const offlineDashboardStats: Record<string, any> = {
  ADMIN: {
    totalProjects: 5,
    activeTasks: 12,
    pendingReviews: 3
  },
  MENTOR: {
    assignedMentees: 4,
    pendingReviews: 2,
    completedTasks: 6
  },
  MENTEE: {
    assignedProjects: 2,
    dueTasks: 5,
    inReview: 1
  }
};

export const fetchDashboard = async (role: string) => {
  const token = localStorage.getItem('mentor-mentee-token');
  if (token === 'demo-local-token') {
    return Promise.resolve(offlineDashboardStats[role] || offlineDashboardStats.MENTEE);
  }

  const path = role === 'ADMIN' ? '/dashboard/admin' : role === 'MENTOR' ? '/dashboard/mentor' : '/dashboard/mentee';
  const response = await api.get<{ success: boolean; data: any }>(path);
  return response.data.data;
};
