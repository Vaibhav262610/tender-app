import { DataTypes, Sequelize } from 'sequelize';

let Company: any;

export const defineCompanyModel = (sequelize: Sequelize) => {
  Company = sequelize.define(
    'Company',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true, // optional
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aboutCompany: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      foundedYear: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companySize: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyWebsite: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      productsOrServices: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      //   tableName: 'companies',
      //   freezeTableName: true,
      timestamps: true, // adds createdAt & updatedAt
    }
  );

  return Company;
};

// Export a function to get the Company model
export const getCompanyModel = () => {
  if (!Company) {
    throw new Error(
      'Company model not initialized. Make sure database connection is established first.'
    );
  }
  return Company;
};

export default getCompanyModel;
