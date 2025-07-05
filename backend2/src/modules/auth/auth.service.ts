import { getUserModel } from './auth.schema';
import bcrypt from 'bcrypt';

interface createUserPayload {
  firstname: string;
  lastname: string;
  companyname: string;
  jobtitle: string;
  email: string;
  hashedPassword: string;
}

interface updateUserPayload {
  firstname?: string;
  lastname?: string;
  companyname?: string;
  jobtitle?: string;
  email?: string;
  password?: string;
}

class AuthService {
  async createUser(payload: createUserPayload) {
    const User = getUserModel();
    const user = await User.create({
      companyname: payload.companyname,
      firstname: payload.firstname,
      lastname: payload.lastname,
      jobtitle: payload.jobtitle,
      email: payload.email,
      password: payload.hashedPassword,
    });
    // console.log(user.dataValues);
    return user.dataValues;
  }

  async updateUser(id: number, payload: updateUserPayload) {
    const User = getUserModel();
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    // If password is being updated, hash it
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    await user.update(payload);
    return user.get();
  }

  async checkUserExists(email: string) {
    const User = getUserModel();
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return true;
    else return false;
  }
  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  async LoginCheckCrendentials(email: string, password: string) {
    const User = getUserModel();
    const user = await User.findOne({ where: { email } });
    // console.log(user);
    if (!user) return false;
    const rawUser = user.get();
    // console.log('raw user ', rawUser);
    const isMatch = await bcrypt.compare(password, rawUser.password);
    if (!isMatch) return false;

    return rawUser;
  }

  async getUserById(id: number) {
    const User = getUserModel();
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.get();
  }
}

export default new AuthService();
