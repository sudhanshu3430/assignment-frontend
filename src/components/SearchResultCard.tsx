
import { User } from '../types';




type Props ={
    userData: User[];
}

const SearchCard = ({ userData }: Props) => {
  
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto max-w-screen-lg">
      {userData.map((user, index) => (
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
            

          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchCard;
