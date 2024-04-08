import { useState, useEffect } from 'react';
import { User } from '../types';

interface RequestBody {
  domain?: string;
  gender?: string;
  available?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFilter = ({ domain: initialDomain = '', gender: initialGender = '', available: initialAvailable = false }): User[] => {
  const [filteredData, setFilteredData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody: RequestBody = { domain: initialDomain, gender: initialGender, available: initialAvailable };
        const response = await fetch(`${API_BASE_URL}/api/filter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData: User[] = await response.json();
        setFilteredData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [initialDomain, initialGender, initialAvailable]);

  return filteredData;
};

export default useFilter;
