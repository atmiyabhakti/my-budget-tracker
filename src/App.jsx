import React, { useState } from 'react';
import Login from './Login';
import MappingTab from './MappingTab';
import LogTab from './LogTab';
import SummaryTab from './SummaryTab';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Mapping');

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div>
      <nav className="tabs">
        {['Mapping', 'Log', 'Summary'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'active' : ''}>{tab}</button>
        ))}
      </nav>
      {activeTab === 'Mapping' && <MappingTab />}
      {activeTab === 'Log' && <LogTab />}
      {activeTab === 'Summary' && <SummaryTab />}
    </div>
  );
}