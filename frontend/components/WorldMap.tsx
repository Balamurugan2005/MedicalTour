'use client';

import { useState } from 'react';
import { Country, Procedure } from '../types';

interface WorldMapProps {
  countries: Country[];
  selectedProcedure: Procedure | null;
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
}

export default function WorldMap({ 
  countries, 
  selectedProcedure, 
  onCountrySelect, 
  selectedCountry 
}: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);

  const handleCountryClick = (country: Country) => {
    if (selectedProcedure) {
      onCountrySelect(country);
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Simple World Map Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl text-blue-200 opacity-40">🌍</div>
      </div>

      {/* Country Markers */}
      {countries.map((country) => {
        const isSelected = selectedCountry?._id === country._id;
        
        return (
          <div
            key={country._id}
            className={`absolute cursor-pointer transition-all duration-200 ${
              isSelected ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              left: `${((country.coordinates.lng + 180) / 360) * 100}%`,
              top: `${((90 - country.coordinates.lat) / 180) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => handleCountryClick(country)}
            onMouseEnter={() => setHoveredCountry(country)}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            {/* Country Marker */}
            <div className={`
              w-4 h-4 rounded-full border-2 border-white shadow-lg
              ${isSelected ? 'bg-blue-500' : 'bg-green-500'}
            `} />
            
            {/* Country Flag */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl">
              {country.flag}
            </div>
            
            {/* Country Name */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
              {country.name}
            </div>
          </div>
        );
      })}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 shadow-lg border border-gray-200">
        <div className="text-xs text-gray-600">
          <div className="font-medium mb-2">Map Legend</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Available Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Selected Country</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {!selectedProcedure && (
        <div className="absolute top-4 left-4 right-4 bg-white/90 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-600">
            Select a procedure to see available destinations
          </p>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredCountry && (
        <div className="absolute bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm z-10 pointer-events-none"
             style={{
               left: `${((hoveredCountry.coordinates.lng + 180) / 360) * 100}%`,
               top: `${((90 - hoveredCountry.coordinates.lat) / 180) * 100}%`,
               transform: 'translate(-50%, -120%)'
             }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{hoveredCountry.flag}</span>
            <span className="font-medium">{hoveredCountry.name}</span>
          </div>
          {selectedProcedure && (
            <div className="text-xs text-gray-600 mt-1">
              Click to compare costs
            </div>
          )}
        </div>
      )}
    </div>
  );
}
