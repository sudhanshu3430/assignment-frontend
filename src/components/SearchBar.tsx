import { useState, ChangeEvent, FormEvent } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from React Router
import { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchUserData = async (searchQuery: string): Promise<User[]> => {
    try {
      const queryString = String(searchQuery);
      const response = await fetch(`${API_BASE_URL}/api/user/${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData: User[] = await response.json(); // Explicitly type userData as User[]
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return []; // Return an empty array if an error occurs
    }
  };
  

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]); // Store search results

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const userData = await fetchUserData(query);
    setSearchResults(userData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSearch();
  };

  return (
    <>
       {searchResults.length > 0 && <Navigate to="/search-results" state={{ searchResults }} />} {/* Redirect to search results page with user data */}
      <form onSubmit={handleSubmit} className="flex items-center justify-center bg-white shadow-sm rounded-full" style={{ width: '400px' }}> {/* Center and adjust width */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="flex-grow py-2 px-9 rounded-l-full focus:outline-none" // Adjust input width
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-r-full hover:bg-blue-600 focus:outline-none">Search</button> {/* Adjust button width */}
      </form>
    </>
  );
};

export default SearchBar;
