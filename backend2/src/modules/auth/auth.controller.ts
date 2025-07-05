import { Request, Response } from 'express';
import authService from './auth.service';
import { generateToken } from './auth.helpers';

interface RegisterPayload {
  firstname: string;
  lastname: string;
  companyname: string;
  jobtitle: string;
  email: string;
  password: string;
}

interface UpdateUserPayload {
  firstname?: string;
  lastname?: string;
  companyname?: string;
  jobtitle?: string;
  email?: string;
  password?: string;
}

class AuthController {
  async login(req: Request, res: Response) {
    try {
      // const token = localStorage.getItem('token');

      const { email, password } = req.body;
      const user = await authService.LoginCheckCrendentials(email, password);
      if (!user) {
        res.status(401).json({ msg: 'Invalid email or password' });
      } else {
        const token = generateToken({ id: user.id, email: user.email });
        res.status(200).json({ msg: 'Login successful', token, user });
        console.log(token);
      }
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  async register(req: Request, res: Response) {
    try {
      const { companyname, firstname, lastname, jobtitle, email, password }: RegisterPayload =
        req.body;

      if (await authService.checkUserExists(email)) {
        res.status(200).json({ msg: 'USER ALREADY EXISTS' });
      }
      const hashedPassword = await authService.hashPassword(password);

      const user = await authService.createUser({
        companyname,
        firstname,
        lastname,
        jobtitle,
        email,
        hashedPassword,
      });
      // console.log(user);

      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json('Internal Server Error');
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const payload: UpdateUserPayload = req.body;

      const user = await authService.updateUser(userId, payload);
      res.json({ user });
    } catch (error) {
      console.error('Update user error:', error);
      if (error instanceof Error && error.message === 'User not found') {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const user = await authService.getUserById(userId);

      if (!user) {
        res.status(404).json({ msg: 'User not found' });
      }

      res.json({ msg: 'Welcome to your profile!', user });
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
}

export default new AuthController();
