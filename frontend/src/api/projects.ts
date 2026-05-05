import api from './api';

const demoProjectsByWorkspace: Record<string, any[]> = {
  'workspace-mentor': [
    {
      _id: 'project-1',
      name: 'Mentorship Onboarding',
      description: 'Set up mentoring goals and timeline for the new cohort.',
      status: 'ACTIVE',
      startDate: '2026-06-01T00:00:00.000Z',
      endDate: '2026-07-15T00:00:00.000Z',
      members: [
        { _id: 'demo-mentor', name: 'Demo Mentor', email: 'mentor@demo.com' },
        { _id: 'demo-student', name: 'Demo Student', email: 'student@demo.com' }
      ]
    },
    {
      _id: 'project-2',
      name: 'Feedback Review Sprint',
      description: 'Collect and act on feedback from mentorship sessions.',
      status: 'PLANNING',
      startDate: '2026-07-16T00:00:00.000Z',
      endDate: '2026-08-01T00:00:00.000Z',
      members: [{ _id: 'demo-mentor', name: 'Demo Mentor', email: 'mentor@demo.com' }]
    }
  ],
  'workspace-student': [
    {
      _id: 'project-3',
      name: 'Student Portfolio Task',
      description: 'Create a project portfolio with milestones and reviews.',
      status: 'IN_PROGRESS',
      startDate: '2026-06-05T00:00:00.000Z',
      endDate: '2026-07-10T00:00:00.000Z',
      members: [{ _id: 'demo-student', name: 'Demo Student', email: 'student@demo.com' }]
    }
  ]
};

const isOfflineDemo = () => ['demo-mentor-token', 'demo-student-token'].includes(localStorage.getItem('mentor-mentee-token') || '');

export const fetchProjects = async (workspaceId: string) => {
  if (isOfflineDemo()) {
    return Promise.resolve(demoProjectsByWorkspace[workspaceId] || []);
  }

  const response = await api.get<{ success: boolean; data: any[] }>(`/projects`, { params: { workspaceId } });
  return response.data.data;
};

export const fetchProject = async (projectId: string) => {
  if (isOfflineDemo()) {
    const allProjects = Object.values(demoProjectsByWorkspace).flat();
    const project = allProjects.find((project) => project._id === projectId);
    return Promise.resolve(project || allProjects[0]);
  }

  const response = await api.get<{ success: boolean; data: any }>(`/projects/${projectId}`);
  return response.data.data;
};
