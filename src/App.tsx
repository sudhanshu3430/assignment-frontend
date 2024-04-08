import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./layouts/Layout";
import SearchResultPage from "./pages/SearchResultPage";
import FilterPage from "./pages/FilterPage";
import TeamPage from "./pages/ShowTeam";
import CreateUserPage from "./pages/CreateUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/search-results" element={<SearchResultPage />} />
        <Route path="/filtered-users" element={<FilterPage />} />
        <Route path="/show-team" element={<TeamPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
