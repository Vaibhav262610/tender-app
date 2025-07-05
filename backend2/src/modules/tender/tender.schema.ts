import { DataTypes, Sequelize } from 'sequelize';

let Tender: any;

export const defineTenderModel = (sequelize: Sequelize) => {
  Tender = sequelize.define(
    'Tender',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      budget: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      requirements: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('open', 'in_progress', 'awarded', 'closed'),
        allowNull: false,
        defaultValue: 'open',
      },
      submissionDeadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      contactEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      contactPhone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      attachments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      // tableName: 'tenders',
      // freezeTableName: true,
      timestamps: true,
    }
  );

  // Set up associations
  Tender.associate = (models: any) => {
    Tender.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Tender;
};

// Export a function to get the Tender model
export const getTenderModel = () => {
  if (!Tender) {
    throw new Error(
      'Tender model not initialized. Make sure database connection is established first.'
    );
  }
  return Tender;
};

export default getTenderModel;
