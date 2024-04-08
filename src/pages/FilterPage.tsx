import React, { useState, useEffect } from 'react';
import SearchCard from '../components/SearchResultCard';
import {  useSearchParams } from 'react-router-dom';
import { User } from '../types';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface FilterPageProps {
  domain?: string;
  gender?: string;
  available?: boolean;
}

const FilterPage: React.FC<FilterPageProps> = () => {
  const [searchParams] = useSearchParams();

  const domain = searchParams.get('domain') || '';
  const gender = searchParams.get('gender') || '';
  const available = Boolean(searchParams.get('available'));
  const [userData, setUserData] = useState<User[]>([]);
  
  console.log('Location state:');
  console.log('Extracted values:', { domain, gender, available })

  useEffect(() => {

    fetchData(domain, gender, available);
  }, []);

const fetchData = async (domain: string, gender: string, available: boolean) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/filter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain, gender, available }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('Response data:', data); // Log response data
    setUserData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  if (userData.length === 0) {
    return (
      <div>
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div>
      <SearchCard userData={userData} />
    </div>
  );
};

export default FilterPage;
