import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { Character } from "./types/character";
import type { FilterData } from "./types/filter";
import getDataFromAPI from "./services/getDataFromAPI";
import Header from "./components/Header";
import Filter from "./components/Filter";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";

const App = () => {
  const [chars, setChars] = useState<Character[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    getDataFromAPI().then((data) => {
      setChars(data);
    });
  }, []);

  const handleFilter = (filterData: FilterData) => {
    if (filterData.key === "searchBox") setNameFilter(filterData.value);
    else if (filterData.key === "status") setStatusFilter(filterData.value);
    else if (filterData.key === "gender") setGenderFilter(filterData.value);
  };

  const renderUnfilteredList = () => {
    setNameFilter("");
    setStatusFilter("all");
    setGenderFilter("all");
  };

  const filteredChars = chars
    .filter((char) =>
      char.name.toUpperCase().includes(nameFilter.toUpperCase())
    )
    .filter((char) =>
      statusFilter === "all" ? true : char.status === statusFilter
    )
    .filter((char) =>
      genderFilter === "all" ? true : char.gender === genderFilter
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <BrowserRouter>
        <Header renderUnfilteredList={renderUnfilteredList} />
        <main className="w-full flex-1 flex flex-col items-center">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Filter
                    handleFilter={handleFilter}
                    onResetFilters={renderUnfilteredList}
                  />
                  <CharacterList filteredChars={filteredChars} />
                </>
              }
            />
            <Route
              path="/char/:id"
              element={<CharacterDetailWrapper chars={chars} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

function CharacterDetailWrapper({ chars }: { chars: Character[] }) {
  const id = Number(window.location.pathname.split("/").pop());
  const foundChar = chars.find((char) => char.id === id);
  return <CharacterDetail char={foundChar} />;
}

export default App;
