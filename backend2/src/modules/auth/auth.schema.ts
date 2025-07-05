import { DataTypes, Sequelize } from 'sequelize';

let User: any;

export const defineUserModel = (sequelize: Sequelize) => {
  User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return User;
};

// Export a function to get the User model
export const getUserModel = () => {
  if (!User) {
    throw new Error('User model not initialized. Make sure database connection is established first.');
  }
  return User;
};

export default getUserModel;
