import UserModel, { IUser } from './user.model';

export class UserService {
  static async findById(id: string) {
    return UserModel.findById(id).select('-password');
  }

  static async updateProfile(id: string, changes: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, changes, { new: true, runValidators: true }).select('-password');
  }
}
