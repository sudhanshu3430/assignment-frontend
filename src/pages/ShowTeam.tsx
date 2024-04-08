
import SearchCard from '../components/SearchResultCard';
import useGetMyTeam from '../api/TeamApi';

const TeamPage = () => {
    const {team} = useGetMyTeam();


  return (
    <div>
      <SearchCard userData={team} />
    </div>
  );
};

export default TeamPage;
