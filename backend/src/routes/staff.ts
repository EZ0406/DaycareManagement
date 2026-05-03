import { Router, Request, Response } from 'express';
import { getDb } from '../config/db';

const router = Router();

// GET /api/staff - Fetch all staff
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const staff = await db.all('SELECT * FROM staff ORDER BY name ASC');
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

// GET /api/staff/:id - Fetch single staff member
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await getDb();
    const staffMember = await db.get('SELECT * FROM staff WHERE id = ?', [id]);
    if (!staffMember) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.json(staffMember);
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({ error: 'Failed to fetch staff member' });
  }
});

// POST /api/staff - Add a new staff member
router.post('/', async (req: Request, res: Response) => {
  const { 
    name, 
    hired_date, 
    pay_date, 
    certificate_expiration, 
    training_due_date, 
    day_off 
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO staff (name, hired_date, pay_date, certificate_expiration, training_due_date, day_off)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, hired_date, pay_date, certificate_expiration, training_due_date, day_off]
    );

    res.status(201).json({ id: result.lastID, name, hired_date, pay_date, certificate_expiration, training_due_date, day_off });
  } catch (error) {
    console.error('Error adding staff:', error);
    res.status(500).json({ error: 'Failed to add staff member' });
  }
});

// PUT /api/staff/:id - Update a staff member
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { 
    name, 
    hired_date, 
    pay_date, 
    certificate_expiration, 
    training_due_date, 
    day_off 
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const db = await getDb();
    const result = await db.run(
      `UPDATE staff SET 
        name = ?, hired_date = ?, pay_date = ?, 
        certificate_expiration = ?, training_due_date = ?, day_off = ?
      WHERE id = ?`,
      [name, hired_date, pay_date, certificate_expiration, training_due_date, day_off, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    res.json({ message: 'Staff member updated successfully' });
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ error: 'Failed to update staff member' });
  }
});

// DELETE /api/staff/:id - Delete a staff member
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await getDb();
    const result = await db.run('DELETE FROM staff WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({ error: 'Failed to delete staff member' });
  }
});

export default router;
