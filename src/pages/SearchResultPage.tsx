import { useLocation } from 'react-router-dom';

import { User } from '../types';
import SearchCard from '../components/SearchResultCard';

const SearchResultPage = () => {
  const location = useLocation();
  const searchResults: User[] = Array.isArray(location.state?.searchResults) ? location.state.searchResults : [];

  return (
    <div>
      <SearchCard userData={searchResults} />
    </div>
  );
};

export default SearchResultPage;
