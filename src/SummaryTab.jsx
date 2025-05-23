import React from 'react';
import { getFromStorage } from './utils/storage';

export default function SummaryTab() {
  const entries = getFromStorage('entries', []);

  const calculateTotals = () => {
    const totals = entries.reduce((acc, entry) => {
      const month = entry.month;
      if (!acc[month]) acc[month] = { income: 0, expense: 0 };

      if (entry.type === 'Income') {
        acc[month].income += parseFloat(entry.amount);
      } else {
        acc[month].expense += parseFloat(entry.amount);
      }

      return acc;
    }, {});

    return totals;
  };

  const totals = calculateTotals();

  return (
    <div>
      <h2>Monthly Summary</h2>
      {Object.keys(totals).length === 0 ? (
        <p>No data available for summary</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(totals).map((month) => (
              <tr key={month}>
                <td>{month}</td>
                <td>${totals[month].income.toFixed(2)}</td>
                <td>${totals[month].expense.toFixed(2)}</td>
                <td>${(totals[month].income - totals[month].expense).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}