import { useState, useEffect } from 'react';
import { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetMyUser = ({ currentPage, itemsPerPage }: { currentPage: number; itemsPerPage: 20 }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const getMyUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user?page=${currentPage}&limit=${itemsPerPage}`, {
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
          const totalCount = userData.total || 0; // Assuming the API response contains the total count of users
          setTotalPages(Math.ceil(totalCount / itemsPerPage));
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
  }, [currentPage, itemsPerPage]);

  return { users, isLoading, totalPages };
};

export default useGetMyUser;
