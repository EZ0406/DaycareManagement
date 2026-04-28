import { Router, Request, Response } from 'express';
import { getDb } from '../config/db';

const router = Router();

// GET /api/students - Fetch all students
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const students = await db.all('SELECT * FROM students ORDER BY name ASC');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// POST /api/students - Add a new student
router.post('/', async (req: Request, res: Response) => {
  const { 
    name, 
    dob, 
    parent_name, 
    parent_email, 
    parent_phone, 
    enrollment_date, 
    tuition_due_date, 
    renewal_date 
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO students (
        name, dob, parent_name, parent_email, parent_phone, 
        enrollment_date, tuition_due_date, renewal_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, dob, parent_name, parent_email, parent_phone, enrollment_date, tuition_due_date, renewal_date]
    );

    res.status(201).json({ 
      id: result.lastID, 
      name, dob, parent_name, parent_email, parent_phone, 
      enrollment_date, tuition_due_date, renewal_date 
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student profile' });
  }
});

export default router;
