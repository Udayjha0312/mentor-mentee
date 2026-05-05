import OrganizationModel, { IOrganization } from './organization.model';

export class OrganizationService {
  static async create(ownerId: string, name: string, description?: string): Promise<IOrganization> {
    return OrganizationModel.create({ owner: ownerId, name, description, members: [ownerId] });
  }

  static async getById(id: string) {
    return OrganizationModel.findById(id).populate('members', 'name email role');
  }

  static async getByUser(userId: string) {
    return OrganizationModel.findOne({ members: userId }).populate('members', 'name email role');
  }
}
