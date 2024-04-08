import  { useState, ChangeEvent, FormEvent } from 'react';

import useGetMyUserSimple from '../api/UserApiSimple';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TeamPage = () => {
  const { users } = useGetMyUserSimple();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    available: '',
    domain: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAvailable = formData.available === 'true';
    try {
      // Make POST request to the server
      await axios.post(`${API_BASE_URL}/api/user`, {
        ...formData,
        available: isAvailable
      });

      // Clear form data after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        available: '',
        domain: ''
      });

      // Optional: You can add code to handle success message or redirect user
    } catch (error) {
      console.error(error);
      // Optional: Handle error message
    }
  };

  const getUniqueValues = (arr: any[], key: string) => {
    return [...new Set(arr.map(item => item[key]))];
  };

  const domainOptions = getUniqueValues(users, 'domain');
  const availableOptions = getUniqueValues(users, 'available');
  const genderOptions = getUniqueValues(users, 'gender');

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Gender</option>
            {genderOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="availability" className="block text-gray-700 text-sm font-bold mb-2">Availability:</label>
          <select
            id="available"
            name="available"
            value={formData.available}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Availability</option>
            {availableOptions.map(option => (
              <option key={option} value={option}>{option ? 'Yes' : 'No'}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="domain" className="block text-gray-700 text-sm font-bold mb-2">Domain:</label>
          <select
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Domain</option>
            {domainOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
    </div>
  );
  
};

export default TeamPage;
