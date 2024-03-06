import React, { useState } from 'react';
import './FilterPanel.css'; // 假设你有一个CSS文件用于样式

const FilterPanel = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value);
    onFilter({ year: value });
  };

  return (
    <div className="filter-panel">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
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

      {/* 其他可能的过滤选项 */}
    </div>
  );
};

export default FilterPanel;
