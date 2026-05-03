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

// GET /api/students/:id - Fetch single student
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await getDb();
    const student = await db.get('SELECT * FROM students WHERE id = ?', [id]);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
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

// PUT /api/students/:id - Update a student
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
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
      `UPDATE students SET 
        name = ?, dob = ?, parent_name = ?, parent_email = ?, parent_phone = ?, 
        enrollment_date = ?, tuition_due_date = ?, renewal_date = ?
      WHERE id = ?`,
      [name, dob, parent_name, parent_email, parent_phone, enrollment_date, tuition_due_date, renewal_date, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student profile' });
  }
});

// DELETE /api/students/:id - Delete a student
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await getDb();
    const result = await db.run('DELETE FROM students WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student profile' });
  }
});

export default router;
