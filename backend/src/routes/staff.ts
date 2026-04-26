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

// POST /api/staff - Add a new staff member
router.post('/', async (req: Request, res: Response) => {
  const { name, hired_date, pay_date, certificate_expiration, training_due_date, day_off } = req.body;

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

export default router;
