"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_helpers_1 = require("./auth.helpers");
class AuthController {
    async login(req, res) {
        try {
            // const token = localStorage.getItem('token');
            const { email, password } = req.body;
            const user = await auth_service_1.default.LoginCheckCrendentials(email, password);
            if (!user) {
                res.status(401).json({ msg: 'Invalid email or password' });
            }
            else {
                const token = (0, auth_helpers_1.generateToken)({ id: user.id, email: user.email });
                res.status(200).json({ msg: 'Login successful', token, user });
                console.log(token);
            }
        }
        catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async register(req, res) {
        try {
            const { companyname, firstname, lastname, jobtitle, email, password } = req.body;
            if (await auth_service_1.default.checkUserExists(email)) {
                res.status(200).json({ msg: 'USER ALREADY EXISTS' });
            }
            const hashedPassword = await auth_service_1.default.hashPassword(password);
            const user = await auth_service_1.default.createUser({
                companyname,
                firstname,
                lastname,
                jobtitle,
                email,
                hashedPassword,
            });
            // console.log(user);
            res.status(201).json({ user });
        }
        catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    }
    async updateUser(req, res) {
        try {
            const userId = req.user.id;
            const payload = req.body;
            const user = await auth_service_1.default.updateUser(userId, payload);
            res.json({ user });
        }
        catch (error) {
            console.error('Update user error:', error);
            if (error instanceof Error && error.message === 'User not found') {
                return res.status(404).json({ msg: 'User not found' });
            }
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await auth_service_1.default.getUserById(userId);
            if (!user) {
                res.status(404).json({ msg: 'User not found' });
            }
            res.json({ msg: 'Welcome to your profile!', user });
        }
        catch (error) {
            console.error('Profile fetch error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
}
exports.default = new AuthController();
