import { DataTypes, Sequelize } from 'sequelize';

let Application: any;

export const defineApplicationModel = (sequelize: Sequelize) => {
  Application = sequelize.define('Application', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return Application;
};

export const getApplicationModel = () => {
  if (!Application) {
    throw new Error('Application model not initialized. Make sure database connection is established first.');
  }
  return Application;
};

export default getApplicationModel;
