import axios from 'axios';
import { User } from '../types';
import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SearchCardProps {
  userData: User[];
}

const SearchCard = ({ userData }: SearchCardProps) => {
  const [users, setUsers] = useState<User[]>(userData);

  const addToTeam = async (user: User) => {
    try {
      const { first_name, last_name, email, gender, domain } = user;
      const userDataForRequest = { first_name, last_name, email, gender, domain };
      await axios.post(`${API_BASE_URL}/api/team`, userDataForRequest);
      // Optionally, you can handle success messages or update the UI accordingly
      console.log('User added to team successfully!');
    } catch (error) {
      console.error('Error adding user to team:', error);
      // Optionally, you can handle error messages
    }
  };

  const handleDeleteUser = async (_id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/user/${_id}`);
      // Update the state to remove the deleted user
      setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
    } catch (error) {
      console.error('Error deleting user:', error);
      // Optionally, you can handle error messages
    }
  };

  // Log whenever the component re-renders
  console.log('SearchCard re-rendered. Props:', { userData });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto max-w-screen-lg">
      {users.map((user, index) => (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col justify-between" key={index}>
          <div>
            <div className="flex items-center mb-4">
              <img src={user.avatar} alt={`Avatar of ${user.first_name} ${user.last_name}`} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-center">{user.first_name} {user.last_name}</h2>
                <p className='text-blue-500 text-center'>Email: {user.email}</p>
              </div>
            </div>
            <div>
              <p>Gender: {user.gender}</p>
              <p>Domain: {user.domain}</p>
              <p>Available: {user.available ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn bg-green-500 text-white rounded-full mr-2 px-4 py-2" onClick={() => addToTeam(user)}>Add to Team</button>
            <button className="btn bg-red-500 text-white rounded-full mr-2 px-4 py-2"  onClick={() => handleDeleteUser(user._id.toString())}>Delete User</button>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchCard;
