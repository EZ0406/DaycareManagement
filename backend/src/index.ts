import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import staffRoutes from './routes/staff';
import studentRoutes from './routes/students';
import remindersRoutes from './routes/reminders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/staff', staffRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/reminders', remindersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Daycare Management API is running...');
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
