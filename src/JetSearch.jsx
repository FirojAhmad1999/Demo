import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Users, Search } from 'lucide-react';

const JetSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults] = useState([
    {
      type: 'Super Light Jet',
      passengers: '6-8',
      flightTime: '02:50',
      price: '37,550',
      images: {
        exterior: '/api/placeholder/300/200',
        interior: '/api/placeholder/300/200'
      }
    },
    {
      type: 'Midsize Jet',
      passengers: '7-9',
      flightTime: '02:00',
      price: '43,500',
      images: {
        exterior: '/api/placeholder/300/200',
        interior: '/api/placeholder/300/200'
      }
    }
  ]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="From"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="To"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="relative">
            <div className="flex items-center border rounded p-2">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center border rounded p-2">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="number"
                placeholder="Passengers"
                className="w-full outline-none"
                min="1"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 bg-amber-600 text-white p-2 rounded flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Search
        </button>
      </div>

      {/* Results Section */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {searchResults.map((jet, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4">
                <img
                  src={jet.images.exterior}
                  alt="Jet exterior"
                  className="w-full h-48 object-cover rounded"
                />
                <img
                  src={jet.images.interior}
                  alt="Jet interior"
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className="col-span-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{jet.type}</h3>
                    <p className="text-gray-600">Passengers: {jet.passengers}</p>
                    <p className="text-gray-600">Est. flight time: {jet.flightTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{jet.price} EUR</p>
                    <p className="text-sm text-gray-500">*Estimated price before taxes & fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JetSearch;