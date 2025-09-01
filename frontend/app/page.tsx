'use client';

import { useState, useEffect } from 'react';
import WorldMap from '../components/WorldMap';
import ProcedureSelector from '../components/ProcedureSelector';
import CostComparison from '../components/CostComparison';
import { Country, Procedure, Cost } from '../types';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [costComparison, setCostComparison] = useState<Cost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProcedure && selectedCountry) {
      fetchCostComparison(selectedProcedure._id, selectedCountry._id);
    }
  }, [selectedProcedure, selectedCountry]);

  const fetchData = async () => {
    try {
      const [countriesRes, proceduresRes] = await Promise.all([
        fetch('http://localhost:5000/api/countries'),
        fetch('http://localhost:5000/api/procedures')
      ]);
      
      if (!countriesRes.ok || !proceduresRes.ok) {
        throw new Error('Failed to fetch data from server');
      }
      
      const countriesData = await countriesRes.json();
      const proceduresData = await proceduresRes.json();
      
      // Ensure we have arrays
      setCountries(Array.isArray(countriesData) ? countriesData : []);
      setProcedures(Array.isArray(proceduresData) ? proceduresData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCountries([]);
      setProcedures([]);
      setLoading(false);
    }
  };

  const fetchCostComparison = async (procedureId: string, countryId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/costs/compare/${procedureId}/${countryId}`);
      const data = await response.json();
      setCostComparison(data);
    } catch (error) {
      console.error('Error fetching cost comparison:', error);
    }
  };

  const handleProcedureSelect = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
    setSelectedCountry(null);
    setCostComparison(null);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading medical tourism data...</p>
        </div>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-2 sm:gap-0">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Explore Medical Tourism Worldwide
              </h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-right">
              Compare costs between US and international destinations
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Panel - Procedure Selection */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <ProcedureSelector
              procedures={procedures}
              selectedProcedure={selectedProcedure}
              onProcedureSelect={handleProcedureSelect}
            />
          </div>

          {/* Center Panel - World Map */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <div className="card h-80 sm:h-96 lg:h-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Select Destination
              </h2>
              <WorldMap
                countries={countries}
                selectedProcedure={selectedProcedure}
                onCountrySelect={handleCountrySelect}
                selectedCountry={selectedCountry}
              />
            </div>
          </div>

          {/* Right Panel - Cost Comparison */}
          <div className="lg:col-span-1 order-3 lg:order-3">
            <CostComparison
              selectedProcedure={selectedProcedure}
              selectedCountry={selectedCountry}
              costComparison={costComparison}
            />
          </div>
        </div>

        {/* Enhanced Cost Summary */}
        <div className="mt-6 sm:mt-8">
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">💡</span>
              Smart Medical Tourism Planning
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🏥</div>
                <div className="font-medium text-gray-900">Medical Savings</div>
                <div className="text-blue-600 font-semibold">Up to 80%</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">✈️</div>
                <div className="font-medium text-gray-900">Flight Included</div>
                <div className="text-blue-600 font-semibold">$200-$1000</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🏨</div>
                <div className="font-medium text-gray-900">Hotel Stay</div>
                <div className="text-blue-600 font-semibold">$50-$200/night</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🛡️</div>
                <div className="font-medium text-gray-900">Insurance</div>
                <div className="text-blue-600 font-semibold">$50-$250</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
