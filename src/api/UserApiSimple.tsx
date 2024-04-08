import { useState, useEffect } from 'react';
import { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetMyUserSimple = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getMyUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const userData = await response.json();
        if (isMounted) {
          setUsers(userData.data);
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

  return { users, isLoading };
};

export default useGetMyUserSimple;
