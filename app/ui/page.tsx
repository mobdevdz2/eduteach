import React from 'react';
import * as UI from '../../components/ui';

const UIPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">UI Components Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(UI).map(([name, Component]) => (
          <div key={name} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <div className="p-2 border rounded">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UIPage;
