import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMyUserSimple from '../api/UserApiSimple';

const Filter: React.FC = () => {
  const { users } = useGetMyUserSimple();
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedAvailable, setSelectedAvailable] = useState<boolean | ''>('');
  const [selectedGender, setSelectedGender] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const queryParams = new URLSearchParams({
      domain: selectedDomain,
      gender: selectedGender,
      available: selectedAvailable.toString(),
    }).toString();
    navigate(`/filtered-users?${queryParams}`);
  };

  const getUniqueValues = (arr: any[], key: string) => {
    return [...new Set(arr.map(item => item[key]))];
  };

  const domainOptions = getUniqueValues(users, 'domain');
  const availableOptions = getUniqueValues(users, 'available');
  const genderOptions = getUniqueValues(users, 'gender');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Filter</h2>
      <div className="mb-2">
        <label htmlFor="Domain" className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
        <select
          id="dropdown1"
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-400"
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option key="All" value="">All</option>
          {domainOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="Available" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
        <select
          id="dropdown2"
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-400"
          onChange={(e) => setSelectedAvailable(e.target.value === 'Yes')}
        >
          <option key="All" value="">All</option>
          {availableOptions.map((option, index) => (
            <option key={index} value={option}>{option ? 'Yes' : 'No'}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="Gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          id="dropdown3"
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-400"
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option key="All" value="">All</option>
          {genderOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <button
        className="btn bg-blue-500 text-white rounded-full px-4 py-2 mt-4"
        onClick={handleButtonClick}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
