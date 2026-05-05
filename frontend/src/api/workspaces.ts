import api from './api';

const demoWorkspaces = [
  {
    _id: 'workspace-mentor',
    name: 'Mentor Growth Workspace',
    description: 'A workspace for mentor-led projects and coaching sessions.',
    members: [
      { role: 'MENTOR', user: { _id: 'demo-mentor', name: 'Demo Mentor', email: 'mentor@demo.com' } },
      { role: 'MENTEE', user: { _id: 'demo-student', name: 'Demo Student', email: 'student@demo.com' } }
    ]
  },
  {
    _id: 'workspace-student',
    name: 'Student Learning Workspace',
    description: 'A workspace for student progress tracking and tasks.',
    members: [
      { role: 'MENTEE', user: { _id: 'demo-student', name: 'Demo Student', email: 'student@demo.com' } }
    ]
  }
];

const isOfflineDemo = () => ['demo-mentor-token', 'demo-student-token'].includes(localStorage.getItem('mentor-mentee-token') || '');

export const fetchWorkspaces = async () => {
  if (isOfflineDemo()) {
    return Promise.resolve(demoWorkspaces);
  }

  const response = await api.get<{ success: boolean; data: any[] }>('/workspaces');
  return response.data.data;
};

export const fetchWorkspace = async (workspaceId: string) => {
  if (isOfflineDemo()) {
    const workspace = demoWorkspaces.find((workspace) => workspace._id === workspaceId) || demoWorkspaces[0];
    return Promise.resolve(workspace);
  }

  const response = await api.get<{ success: boolean; data: any }>(`/workspaces/${workspaceId}`);
  return response.data.data;
};
