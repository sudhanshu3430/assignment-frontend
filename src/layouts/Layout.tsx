
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import SideButtons from "../components/SideButtons";
import HomePage from "../pages/HomePage";





const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <SearchBar />

      <div className="flex flex-grow w-full">
        <div className="w-1/4">
          <Filter />
        </div>

        <div className="w-3/4">
          <div className="flex justify-between">
            <HomePage />
            <div className="w-1/4 ml-4">
              <SideButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Layout;
