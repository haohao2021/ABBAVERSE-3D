import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = ({ songData, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredData = Object.entries(songData)
      .filter(([key, value]) =>
        value.original_song.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    onSearch(filteredData);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value);

    const filteredData = Object.entries(songData)
      .filter(([key, value]) =>
        value.covers.some((cover) => cover.release_year === parseInt(value))
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    onFilter(filteredData);
  };

  return (
    <div className="filter-panel">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by song title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          name="searchTitle" 
          id="searchTitleInput" 
        />
      </div>
      <div className="year-slider-container">
        <label htmlFor="year-slider" className="year-slider-label">
          Release Year: {selectedYear}
        </label>
        <input
          type="range"
          min="1960" // 假设ABBA的最早发行年份
          max={new Date().getFullYear()} // 当前年份
          value={selectedYear}
          onChange={handleYearChange}
          className="year-slider"
          id="year-slider"
        />
      </div>
    </div>
  );
};

export default FilterPanel;
