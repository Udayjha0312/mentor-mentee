import bcrypt from 'bcrypt';
import app from './app';
import { connectDatabase } from './config/mongo';
import { env } from './config/env';
import UserModel from './modules/users/user.model';
import OrganizationModel from './modules/organizations/organization.model';

const DEMO_EMAIL = 'demo@mentor.com';
const DEMO_PASSWORD = 'Demo123!';

async function seedDemoUser() {
  const existingDemo = await UserModel.findOne({ email: DEMO_EMAIL });
  if (existingDemo) return;

  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
  const organization = await OrganizationModel.create({
    name: 'Demo Organization',
    description: 'Demo workspace for mentor-mentee preview',
    owner: null,
    members: []
  });

  const user = await UserModel.create({
    name: 'Demo Mentor',
    email: DEMO_EMAIL,
    password: hashedPassword,
    role: 'ADMIN',
    organization: organization._id
  });

  organization.owner = user._id;
  organization.members.push(user._id);
  await organization.save();

  console.log('✅ Demo user created:', DEMO_EMAIL);
}

async function startServer() {
  await connectDatabase();
  await seedDemoUser();
  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
