export type Role = 'ADMIN' | 'MENTOR' | 'MENTEE';

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  organization: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
