import express from 'express';
import 'colors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;
connectDB();
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// readdirSync('./server/routes').map(route =>
//   app.use('/api', require(`./routes/${route}`))
// );

app.use('/api', authRouter);

app.listen(9000, () =>
  console.log(`Server running on port: ${9000}`.yellow.bold)
);
