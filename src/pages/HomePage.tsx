import { useState } from 'react';
import useGetMyUser from '../api/UserApi';
import UserCard from '../components/UserCard';
import ReactPaginate from 'react-paginate';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Define the number of items per page
  const { users, isLoading, totalPages } = useGetMyUser({ currentPage, itemsPerPage });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Pagination logic
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Render UserCard only if users array is not empty
  return (
    <div>
      {users.length > 0 && (
        <UserCard
          userData={users} // Pass the entire users array to UserCard
        />
      )}
      {totalPages > 0 && (
         <ReactPaginate
         pageCount={totalPages}
         onPageChange={handlePageClick}
         containerClassName={'pagination'}
         activeClassName={'active'}
         pageClassName={'inline-block mx-1 rounded-full px-3 py-2 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300'}
         previousClassName={'inline-block mx-1 rounded-full px-3 py-2 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300'}
         nextClassName={'inline-block mx-1 rounded-full px-3 py-2 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300'}
         breakClassName={'inline-block mx-1 px-3 py-2'}
         pageLinkClassName={'focus:outline-none focus:bg-gray-300'}
         previousLabel={'Previous'}
         nextLabel={'Next'}
       />
      )}
    </div>
  );
};

export default HomePage;
