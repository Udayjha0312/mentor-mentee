import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../users/user.model';
import OrganizationModel from '../organizations/organization.model';
import { env } from '../../config/env';

const DEMO_EMAIL = 'demo@mentor.com';
const DEMO_PASSWORD = 'Demo123!';

export class AuthService {
  static async signup(name: string, email: string, password: string, organizationName: string) {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error('Email already registered');

    const organization = await OrganizationModel.create({ name: organizationName, owner: null, members: [] });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword, role: 'ADMIN', organization: organization._id });
    organization.owner = user._id;
    organization.members.push(user._id);
    await organization.save();

    return { user, token: AuthService.generateToken(user) };
  }

  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid credentials');
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new Error('Invalid credentials');
    return { user: AuthService.cleanUser(user), token: AuthService.generateToken(user) };
  }

  static async demoLogin() {
    let user = await UserModel.findOne({ email: DEMO_EMAIL }).select('+password');
    if (!user) {
      const organization = await OrganizationModel.create({
        name: 'Demo Organization',
        description: 'Demo workspace for mentor-mentee preview',
        owner: null,
        members: []
      });

      const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
      user = await UserModel.create({
        name: 'Demo Mentor',
        email: DEMO_EMAIL,
        password: hashedPassword,
        role: 'ADMIN',
        organization: organization._id
      });

      organization.owner = user._id;
      organization.members.push(user._id);
      await organization.save();
    }

    return { user: AuthService.cleanUser(user), token: AuthService.generateToken(user) };
  }

  static cleanUser(user: IUser) {
    const userData = user.toObject();
    delete userData.password;
    return userData;
  }

  static generateToken(user: IUser) {
    return jwt.sign(
      { userId: user._id.toString() },
      env.jwtSecret as string,
      { expiresIn: env.jwtExpiresIn } as jwt.SignOptions
    );
  }
}
