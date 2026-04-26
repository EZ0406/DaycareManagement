import React, { useState } from 'react';

interface Staff {
  id: number;
  name: string;
  hired_date: string;
  pay_date: string;
  certificate_expiration: string;
  training_due_date: string;
  day_off: string;
}

interface StaffListProps {
  staff: Staff[];
}

type SortField = keyof Staff;
type SortOrder = 'asc' | 'desc';

const StaffList: React.FC<StaffListProps> = ({ staff }) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedStaff = [...staff].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '🔼' : '🔽';
  };

  return (
    <div className="table-container">
      <table className="staff-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {getSortIcon('name')}</th>
            <th onClick={() => handleSort('hired_date')}>Hired Date {getSortIcon('hired_date')}</th>
            <th onClick={() => handleSort('pay_date')}>Pay Date {getSortIcon('pay_date')}</th>
            <th onClick={() => handleSort('certificate_expiration')}>Cert. Exp. {getSortIcon('certificate_expiration')}</th>
            <th onClick={() => handleSort('training_due_date')}>Training Due {getSortIcon('training_due_date')}</th>
            <th onClick={() => handleSort('day_off')}>Day Off {getSortIcon('day_off')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedStaff.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.hired_date || '-'}</td>
              <td>{person.pay_date || '-'}</td>
              <td className={isExpiring(person.certificate_expiration) ? 'warning' : ''}>
                {person.certificate_expiration || '-'}
              </td>
              <td>{person.training_due_date || '-'}</td>
              <td>{person.day_off || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const isExpiring = (dateStr: string) => {
  if (!dateStr) return false;
  const expDate = new Date(dateStr);
  const now = new Date();
  const diffTime = expDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 30; // Warning if less than 30 days
};

export default StaffList;
