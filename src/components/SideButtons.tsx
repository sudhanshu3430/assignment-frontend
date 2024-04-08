import React from 'react';
import { Link } from 'react-router-dom';

const SideButtons: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Actions</h2>
      <Link to="/show-team">
      <button className="btn bg-blue-500 text-white py-2 px-4 rounded-lg mb-2">Show Team</button>
      </Link>
      <Link
      to="/create-user"
      >
      <button className="btn bg-green-500 text-white py-2 px-4 rounded-lg">Create User</button>
      </Link>
      
     
    </div>
  );
};

export default SideButtons;
