import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import MentorDashboardPage from './pages/MentorDashboard';
import MenteeDashboardPage from './pages/MenteeDashboard';
import MentorWorkspacesPage from './pages/MentorWorkspaces';
import MenteeWorkspacesPage from './pages/MenteeWorkspaces';
import MentorProjectsPage from './pages/MentorProjects';
import MenteeProjectsPage from './pages/MenteeProjects';
import WorkspaceDetailsPage from './pages/WorkspaceDetails';
import ProjectDetailsPage from './pages/ProjectDetails';
import TaskDetailsPage from './pages/TaskDetails';
import InvitationsPage from './pages/Invitations';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import NotFoundPage from './pages/NotFound';
import AppShell from './layouts/AppShell';

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function RoleBasedRedirect() {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" replace />;
  const rolePath = user.role === 'MENTOR' ? '/app/mentor/dashboard' : '/app/mentee/dashboard';
  return <Navigate to={rolePath} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <AppShell />
          </PrivateRoute>
        }
      >
        <Route index element={<RoleBasedRedirect />} />
        <Route path="mentor/dashboard" element={<MentorDashboardPage />} />
        <Route path="mentee/dashboard" element={<MenteeDashboardPage />} />
        <Route path="mentor/workspaces" element={<MentorWorkspacesPage />} />
        <Route path="mentee/workspaces" element={<MenteeWorkspacesPage />} />
        <Route path="mentor/projects" element={<MentorProjectsPage />} />
        <Route path="mentee/projects" element={<MenteeProjectsPage />} />
        <Route path="workspaces/:workspaceId" element={<WorkspaceDetailsPage />} />
        <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
        <Route path="invitations" element={<InvitationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
