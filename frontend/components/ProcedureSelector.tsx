'use client';

import { useState } from 'react';
import { Procedure } from '../types';

interface ProcedureSelectorProps {
  procedures: Procedure[];
  selectedProcedure: Procedure | null;
  onProcedureSelect: (procedure: Procedure) => void;
}

export default function ProcedureSelector({ 
  procedures, 
  selectedProcedure, 
  onProcedureSelect 
}: ProcedureSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Safety check - ensure procedures is always an array
  const safeProcedures = procedures || [];

  const categories = [
    { id: 'all', name: 'All Procedures', icon: '🏥' },
    { id: 'cosmetic', name: 'Cosmetic', icon: '✨' },
    { id: 'dental', name: 'Dental', icon: '🦷' },
    { id: 'imaging', name: 'Imaging', icon: '📷' }
  ];

  const filteredProcedures = selectedCategory === 'all' 
    ? safeProcedures
    : safeProcedures.filter(p => p.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cosmetic': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'dental': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'imaging': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Show loading state if procedures haven't been loaded yet
  if (safeProcedures.length === 0) {
    return (
      <div className="card h-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Select Procedure
        </h2>
        <div className="text-center py-12 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Loading procedures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Select Procedure
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                selectedCategory === category.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{category.icon}</span>
                <span className="text-xs">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Procedures List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredProcedures.map((procedure) => (
          <div
            key={procedure._id}
            onClick={() => onProcedureSelect(procedure)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedProcedure?._id === procedure._id
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  {procedure.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {procedure.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(procedure.category)}`}>
                    {procedure.category}
                  </span>
                  {procedure.isNonInvasive && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      Non-Invasive
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <div className={`w-3 h-3 rounded-full ${
                  selectedProcedure?._id === procedure._id 
                    ? 'bg-primary-500' 
                    : 'bg-gray-300'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProcedures.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p>No procedures found in this category</p>
        </div>
      )}
    </div>
  );
}
