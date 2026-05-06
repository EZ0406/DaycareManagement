import { Router, Request, Response } from 'express';
import { getDb } from '../config/db';

const router = Router();

// GET /api/reminders/upcoming - Fetch upcoming events for dashboard
router.get('/upcoming', async (req: Request, res: Response) => {
  const tuitionDays = req.query.tuitionDays ? parseInt(req.query.tuitionDays as string) : null;
  const certDays = req.query.certDays ? parseInt(req.query.certDays as string) : null;

  try {
    const db = await getDb();

    // Fetch students with tuition due (including overdue)
    let studentsQuery = `
      SELECT id, name, tuition_due_date as date, 'Tuition' as type,
      CASE 
        WHEN tuition_due_date < date('now') THEN 'Overdue'
        WHEN tuition_due_date <= date('now', '+3 days') THEN 'Due Soon'
        ELSE 'Upcoming'
      END as status
      FROM students 
    `;
    const studentsParams = [];
    if (tuitionDays !== null) {
      studentsQuery += ` WHERE tuition_due_date <= date('now', '+' || ? || ' days')`;
      studentsParams.push(tuitionDays);
    }
    studentsQuery += ` ORDER BY status DESC, tuition_due_date ASC`;
    const studentsDue = await db.all(studentsQuery, studentsParams);

    // Fetch staff with certificates expiring (including overdue)
    let staffQuery = `
      SELECT id, name, certificate_expiration as date, 'Certificate' as type,
      CASE 
        WHEN certificate_expiration < date('now') THEN 'Overdue'
        WHEN certificate_expiration <= date('now', '+3 days') THEN 'Due Soon'
        ELSE 'Upcoming'
      END as status
      FROM staff 
    `;
    const staffParams = [];
    if (certDays !== null) {
      staffQuery += ` WHERE certificate_expiration <= date('now', '+' || ? || ' days')`;
      staffParams.push(certDays);
    }
    staffQuery += ` ORDER BY status DESC, certificate_expiration ASC`;
    const staffExpiring = await db.all(staffQuery, staffParams);

    // Combine for details list
    const details = [...studentsDue, ...staffExpiring].sort((a, b) => {
      // Sort by status priority: Overdue > Due Soon > Upcoming
      const priority: Record<string, number> = { 'Overdue': 0, 'Due Soon': 1, 'Upcoming': 2 };
      if (priority[a.status] !== priority[b.status]) {
        return priority[a.status] - priority[b.status];
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // Summary counts
    const summary = {
      payments: studentsDue.filter(s => s.status !== 'Upcoming').length,
      expirations: staffExpiring.filter(s => s.status !== 'Upcoming').length,
      overdue: details.filter(d => d.status === 'Overdue').length
    };

    res.json({ summary, details });
  } catch (error) {
    console.error('Error fetching upcoming reminders:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming reminders' });
  }
});

export default router;
