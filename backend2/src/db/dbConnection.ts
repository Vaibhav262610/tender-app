import { Sequelize } from 'sequelize';
import { defineUserModel } from '../modules/auth/auth.schema';
import { defineCompanyModel } from '../modules/company/company.schema';
import { defineTenderModel } from '../modules/tender/tender.schema';
import { defineApplicationModel } from '../modules/application/application.schema';

interface DatabaseConnectionTypes {
  database: string;
  username: string;
  password: string;
}

// Create sequelize instance immediately
const sequelize = new Sequelize('tender', 'postgres', 'oppoa33f', {
  host: 'localhost',
  dialect: 'postgres',
});

export const dbConnection = async ({ database, username, password }: DatabaseConnectionTypes) => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Define models
    const User = defineUserModel(sequelize);
    const Company = defineCompanyModel(sequelize);
    const Tender = defineTenderModel(sequelize);
    const Application = defineApplicationModel(sequelize);

    // Set up associations
    if (Tender.associate) {
      Tender.associate({ User, Company });
    }

    // Set up User-Company associations
    Company.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    User.hasOne(Company, { foreignKey: 'userId', as: 'company' });

    // Set up Application associations
    Application.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Application.belongsTo(Tender, { foreignKey: 'tenderId', as: 'tender' });
    User.hasMany(Application, { foreignKey: 'userId', as: 'applications' });
    Tender.hasMany(Application, { foreignKey: 'tenderId', as: 'applications' });

    // Sync all models
    // await sequelize.sync({ alter: true });
    // console.log('Tables created successfully');
    console.log('POSTGRES DB CONNECTED SUCCESSFULLY');
  } catch (error) {
    console.error('Error in connecting to database:', error);
    throw error;
  }
};

export { sequelize };
export default {};
