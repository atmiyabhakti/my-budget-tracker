import React, { useState } from 'react';
import { saveToStorage, getFromStorage } from './utils/storage';

export default function LogTab() {
  const [entries, setEntries] = useState(getFromStorage('entries', []));
  const [newEntry, setNewEntry] = useState({
    date: '',
    year: '',
    month: '',
    category: '',
    paymentMethod: '',
    type: 'Expense',
    description: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleAddEntry = () => {
    if (Object.values(newEntry).includes('')) {
      alert('Please fill in all fields.');
      return;
    }
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveToStorage('entries', updatedEntries);
    setNewEntry({ date: '', year: '', month: '', category: '', paymentMethod: '', type: 'Expense', description: '', amount: '' });
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    saveToStorage('entries', updatedEntries);
  };

  return (
    <div>
      <h2>Income/Expense Log</h2>
      <form>
        <input type="date" name="date" value={newEntry.date} onChange={handleInputChange} />
        <input type="text" name="year" placeholder="Year" value={newEntry.year} onChange={handleInputChange} />
        <input type="text" name="month" placeholder="Month" value={newEntry.month} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Category" value={newEntry.category} onChange={handleInputChange} />
        <input type="text" name="paymentMethod" placeholder="Payment Method" value={newEntry.paymentMethod} onChange={handleInputChange} />
        <select name="type" value={newEntry.type} onChange={handleInputChange}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
        <input type="text" name="description" placeholder="Description" value={newEntry.description} onChange={handleInputChange} />
        <input type="number" name="amount" placeholder="Amount" value={newEntry.amount} onChange={handleInputChange} />
        <button type="button" onClick={handleAddEntry}>Add Entry</button>
      </form>

      <h3>Entries</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Year</th>
            <th>Month</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.year}</td>
              <td>{entry.month}</td>
              <td>{entry.category}</td>
              <td>{entry.paymentMethod}</td>
              <td>{entry.type}</td>
              <td>{entry.description}</td>
              <td>{entry.amount}</td>
              <td>
                <button onClick={() => handleDeleteEntry(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}