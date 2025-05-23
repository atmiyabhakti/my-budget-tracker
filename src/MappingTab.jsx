import React, { useState } from 'react';
import { saveToStorage, getFromStorage } from './utils/storage';

export default function MappingTab() {
  const [mappingData, setMappingData] = useState(getFromStorage('mappingData', { months: [], categories: [], paymentMethods: [] }));
  const [newItem, setNewItem] = useState({
    type: 'month',
    value: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    if (!newItem.value) {
      alert('Please enter a value');
      return;
    }
    const updatedMappingData = { ...mappingData };
    updatedMappingData[newItem.type].push(newItem.value);

    setMappingData(updatedMappingData);
    saveToStorage('mappingData', updatedMappingData);
    setNewItem({ type: 'month', value: '' });
  };

  const handleRemoveItem = (type, value) => {
    const updatedMappingData = { ...mappingData };
    updatedMappingData[type] = updatedMappingData[type].filter((item) => item !== value);

    setMappingData(updatedMappingData);
    saveToStorage('mappingData', updatedMappingData);
  };

  return (
    <div>
      <h2>Mapping Tab</h2>
      <div>
        <label>
          Type:
          <select name="type" value={newItem.type} onChange={handleInputChange}>
            <option value="month">Month</option>
            <option value="category">Category</option>
            <option value="paymentMethod">Payment Method</option>
          </select>
        </label>
        <input
          type="text"
          name="value"
          placeholder={`Enter ${newItem.type}`}
          value={newItem.value}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddItem}>Add</button>
      </div>

      <h3>Months</h3>
      <ul>
        {mappingData.months.map((month, index) => (
          <li key={index}>
            {month} <button onClick={() => handleRemoveItem('months', month)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Categories</h3>
      <ul>
        {mappingData.categories.map((category, index) => (
          <li key={index}>
            {category} <button onClick={() => handleRemoveItem('categories', category)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Payment Methods</h3>
      <ul>
        {mappingData.paymentMethods.map((paymentMethod, index) => (
          <li key={index}>
            {paymentMethod} <button onClick={() => handleRemoveItem('paymentMethods', paymentMethod)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}