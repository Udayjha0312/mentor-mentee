import crypto from 'crypto';
import WorkspaceModel, { IWorkspaceMember } from './workspace.model';
import InvitationModel, { IInvitation } from './invitation.model';
import OrganizationModel from '../organizations/organization.model';
import UserModel from '../users/user.model';

export class WorkspaceService {
  static async create(organizationId: string, name: string, description?: string) {
    return WorkspaceModel.create({ organization: organizationId, name, description, members: [] });
  }

  static async getById(id: string) {
    return WorkspaceModel.findById(id).populate('members.user', 'name email role');
  }

  static async listByOrganization(organizationId: string) {
    return WorkspaceModel.find({ organization: organizationId }).populate('members.user', 'name email role');
  }

  static async invite(workspaceId: string, invitedById: string, email: string, role: string) {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) throw new Error('Workspace not found');
    const existingInvite = await InvitationModel.findOne({ workspace: workspaceId, email, status: 'PENDING' });
    if (existingInvite) return existingInvite;
    const token = crypto.randomBytes(24).toString('hex');
    const invitation = await InvitationModel.create({ workspace: workspaceId, email, invitedBy: invitedById, role, token });
    // Mock email logic placeholder
    return invitation;
  }

  static async respondInvitation(token: string, status: 'ACCEPTED' | 'REJECTED', userId?: string) {
    const invitation = await InvitationModel.findOne({ token });
    if (!invitation) throw new Error('Invitation not found');
    invitation.status = status;
    await invitation.save();
    if (status === 'ACCEPTED' && userId) {
      const user = await UserModel.findOne({ email: invitation.email });
      if (!user) throw new Error('User account not found');
      const workspace = await WorkspaceModel.findById(invitation.workspace);
      if (!workspace) throw new Error('Workspace not found');
      workspace.members.push({ user: user._id, role: invitation.role } as IWorkspaceMember);
      await workspace.save();
    }
    return invitation;
  }

  static async acceptInvite(token: string, userId: string) {
    return WorkspaceService.respondInvitation(token, 'ACCEPTED', userId);
  }

  static async rejectInvite(token: string) {
    return WorkspaceService.respondInvitation(token, 'REJECTED');
  }
}
