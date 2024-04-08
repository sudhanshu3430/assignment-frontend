import { useState, useEffect } from 'react';
import { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetMyTeam = () => {
  const [team, setTeams] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getMyUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/team`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const teamData = await response.json();
        if (isMounted) {
          setTeams(teamData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getMyUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { team, isLoading };
};

export default useGetMyTeam;
