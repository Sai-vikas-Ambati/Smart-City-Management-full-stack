import React, { useState } from 'react';

const SearchFilter = ({ type, data, setFilteredData, setSelectedVehicle }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSearch = () => {
    const results = data.filter((item) =>
      [from.toLowerCase(), to.toLowerCase()].some((loc) =>
        item.location.toLowerCase().includes(loc)
      )
    );
    setFilteredData(results);
    setSelectedVehicle(results[0] || null); // Set the first matched vehicle
  };

  return (
    <div className="search-filter">
      <input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
      <button onClick={handleSearch}>Search {type.charAt(0).toUpperCase() + type.slice(1)}</button>
    </div>
  );
};

export default SearchFilter;
