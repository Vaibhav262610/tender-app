"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_schema_1 = require("./auth.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    async createUser(payload) {
        const User = (0, auth_schema_1.getUserModel)();
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
    async updateUser(id, payload) {
        const User = (0, auth_schema_1.getUserModel)();
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        // If password is being updated, hash it
        if (payload.password) {
            payload.password = await bcrypt_1.default.hash(payload.password, 10);
        }
        await user.update(payload);
        return user.get();
    }
    async checkUserExists(email) {
        const User = (0, auth_schema_1.getUserModel)();
        const userExists = await User.findOne({ where: { email } });
        if (userExists)
            return true;
        else
            return false;
    }
    async hashPassword(password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    }
    async LoginCheckCrendentials(email, password) {
        const User = (0, auth_schema_1.getUserModel)();
        const user = await User.findOne({ where: { email } });
        // console.log(user);
        if (!user)
            return false;
        const rawUser = user.get();
        // console.log('raw user ', rawUser);
        const isMatch = await bcrypt_1.default.compare(password, rawUser.password);
        if (!isMatch)
            return false;
        return rawUser;
    }
    async getUserById(id) {
        const User = (0, auth_schema_1.getUserModel)();
        const user = await User.findByPk(id);
        if (!user)
            return null;
        return user.get();
    }
}
exports.default = new AuthService();
