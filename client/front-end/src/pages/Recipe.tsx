import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RecipeSlide from "../components/recipe/SpecialRecipeSlide";

const Recipe: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Popularity"); // Default sort option
  const [triggerSearch, setTriggerSearch] = useState(false); // Trigger state to update RecipeSlide
  const navigate = useNavigate();

  const handleSearch = () => {
    setTriggerSearch((prev) => !prev); // Toggle trigger to force RecipeSlide to refetch
  };

  return (
    <main className="bg-light w-full min-h-screen overflow-clip">
      <Navbar />

      {/* Search, most popular, and most recent */}
      <div className="flex mt-[4rem] pt-[4rem]">
        <div className="left-0">
          <div className="bg-gray-7 w-[20rem] h-[35rem] rounded-tr-[2rem] rounded-br-[2rem] px-4 py-4">
            <p className="font-semibold text-2xl mb-6">Discover</p>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search .."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button to get recipes by search */}
            <div className="mt-[2rem]">
              <button
                onClick={handleSearch}
                className="w-full bg-orange text-white py-2 rounded-md hover:bg-light_orange transition"
              >
                Search
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="mt-[4rem]">
              <label className="block font-semibold mb-2">Sort by</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Popularity">Popularity</option>
                <option value="Latest">Latest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recipe Slide */}
        <div className="mx-4">
          <RecipeSlide
            searchQuery={searchQuery}
            sortOption={sortOption}
            triggerSearch={triggerSearch} // Prop to re-trigger fetch when search button is clicked
          />
        </div>
      </div>

      <div className="w-full mt-[5rem]">
        <Footer />
      </div>
    </main>
  );
};

export default Recipe;
