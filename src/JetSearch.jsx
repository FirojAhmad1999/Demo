import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Search, Plane } from 'lucide-react';

const JetSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('');

  const [searchResults] = useState([
    {
      type: 'Super Light Jet',
      passengers: '6-8',
      flightTime: '02:50',
      price: '37,550',
      images: {
        exterior: '/api/placeholder/300/200',
        interior: '/api/placeholder/300/200',
      },
    },
    {
      type: 'Midsize Jet',
      passengers: '7-9',
      flightTime: '02:00',
      price: '43,500',
      images: {
        exterior: '/api/placeholder/300/200',
        interior: '/api/placeholder/300/200',
      },
    },
  ]);

  const updateParentHeight = () => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      window.parent.postMessage({ type: 'setHeight', height }, '*');
    }
  };

  useEffect(() => {
    updateParentHeight();
    window.addEventListener('resize', updateParentHeight);

    const handleMessage = (event) => {
      if (event.data.type === 'windowResized') {
        updateParentHeight();
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('resize', updateParentHeight);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    updateParentHeight();
  }, [isExpanded]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateParentHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setIsExpanded(true);

    // Notify parent to scroll to the top
    window.parent.postMessage({ type: 'scrollToTop' }, '*');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto p-4 mt-40 items-center">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="flex items-center border rounded p-2">
              <Plane className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="From"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center border rounded p-2">
              <Plane className="w-5 h-5 text-gray-400 mr-2 transform rotate-90" />
              <input
                type="text"
                placeholder="To"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center border rounded p-2">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full outline-none"
                min="1"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white p-2 rounded flex items-center justify-center gap-2 transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search
            </>
          )}
        </button>
      </div>

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
                    <p className="text-2xl font-bold">${jet.price}</p>
                    <p className="text-sm text-gray-500">*Estimated price before taxes & fees</p>
                    <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded transition-colors">
                      Book Now
                    </button>
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
