import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/routes';
import { dbConnection } from './db/dbConnection';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

dbConnection({ database: 'tender', username: 'postgres', password: 'oppoa33f' });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
