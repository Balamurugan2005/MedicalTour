'use client';

import { Procedure, Country, Cost } from '../types';

interface CostComparisonProps {
  selectedProcedure: Procedure | null;
  selectedCountry: Country | null;
  costComparison: Cost | null;
}

export default function CostComparison({ 
  selectedProcedure, 
  selectedCountry, 
  costComparison 
}: CostComparisonProps) {
  if (!selectedProcedure) {
    return (
      <div className="card h-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cost Comparison
        </h2>
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">💰</div>
          <p>Select a procedure to see cost comparisons</p>
        </div>
      </div>
    );
  }

  if (!selectedCountry) {
    return (
      <div className="card h-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cost Comparison
        </h2>
        <div className="mb-4">
          <h3 className="font-medium text-gray-900 mb-2">Selected Procedure:</h3>
          <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
            <h4 className="font-medium text-primary-900">{selectedProcedure.name}</h4>
            <p className="text-sm text-primary-700">{selectedProcedure.description}</p>
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          <div className="text-3xl mb-2">🌍</div>
          <p>Select a destination country to compare costs</p>
        </div>
      </div>
    );
  }

  if (!costComparison) {
    return (
      <div className="card h-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cost Comparison
        </h2>
        <div className="mb-4">
          <h3 className="font-medium text-gray-900 mb-2">Selected Procedure:</h3>
          <div className="p-3 bg-primary-50 rounded-lg border border-primary-200 mb-3">
            <h4 className="font-medium text-primary-900">{selectedProcedure.name}</h4>
            <p className="text-sm text-primary-700">{selectedProcedure.description}</p>
          </div>
          <h3 className="font-medium text-gray-900 mb-2">Selected Destination:</h3>
          <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <span className="font-medium text-secondary-900">{selectedCountry.name}</span>
            </div>
          </div>
        </div>
        <div className="text-center py-6 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p>Loading cost data...</p>
        </div>
      </div>
    );
  }

  const savings = costComparison.usCost - costComparison.localCost;
  const savingsPercentage = Math.round((savings / costComparison.usCost) * 100);

  return (
    <div className="card h-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Cost Comparison
      </h2>

      {/* Procedure and Country Info */}
      <div className="mb-6 space-y-3">
        <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="font-medium text-primary-900 mb-1">Procedure</h3>
          <h4 className="font-semibold text-primary-800">{selectedProcedure.name}</h4>
          <p className="text-sm text-primary-700">{selectedProcedure.description}</p>
        </div>
        
        <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
          <h3 className="font-medium text-secondary-900 mb-1">Destination</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedCountry.flag}</span>
            <span className="font-semibold text-secondary-800">{selectedCountry.name}</span>
          </div>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Cost Breakdown</h3>
        
        {/* US Cost */}
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-red-900">US Cost</h4>
              <p className="text-sm text-red-700">Average cost in United States</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-900">
                ${costComparison.usCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Local Cost */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-green-900">{selectedCountry.name} Cost</h4>
              <p className="text-sm text-green-700">Cost at destination</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-900">
                ${costComparison.localCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-blue-900">Total Savings</h4>
              <p className="text-sm text-blue-700">Amount you can save</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">
                ${savings.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">
                ({savingsPercentage}% savings)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Costs */}
      <div className="mt-6 space-y-4">
        <h3 className="font-medium text-gray-900">Travel & Accommodation Costs</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Flight Cost */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-center">
              <div className="text-lg mb-1">✈️</div>
              <h4 className="font-medium text-purple-900 text-sm">Flight</h4>
              <div className="text-lg font-bold text-purple-800">
                ${costComparison.flightCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Hotel Cost */}
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-center">
              <div className="text-lg mb-1">🏨</div>
              <h4 className="font-medium text-orange-900 text-sm">Hotel (per night)</h4>
              <div className="text-lg font-bold text-orange-800">
                ${costComparison.hotelCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Visa Cost */}
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-center">
              <div className="text-lg mb-1">📋</div>
              <h4 className="font-medium text-yellow-900 text-sm">Visa</h4>
              <div className="text-lg font-bold text-yellow-800">
                ${costComparison.visaCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Insurance Cost */}
          <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
            <div className="text-center">
              <div className="text-lg mb-1">🛡️</div>
              <h4 className="font-medium text-teal-900 text-sm">Insurance</h4>
              <div className="text-lg font-bold text-teal-800">
                ${costComparison.insuranceCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Total Travel Cost */}
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-indigo-900">Total Travel Cost</h4>
              <p className="text-sm text-indigo-700">Flight + Hotel + Visa + Insurance</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-900">
                ${(costComparison.flightCost + costComparison.hotelCost + costComparison.visaCost + costComparison.insuranceCost).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {costComparison.notes && (
        <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-900 mb-1">Notes</h4>
          <p className="text-sm text-yellow-800">{costComparison.notes}</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          * Costs are estimates and may vary. Always consult with healthcare providers for accurate pricing.
        </p>
      </div>
    </div>
  );
}
