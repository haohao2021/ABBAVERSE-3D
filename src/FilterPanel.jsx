import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ songData, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // 注意: 这个示例代码可能需要根据实际的JSON结构调整
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // 使用搜索词过滤歌曲数据
    const filteredData = Object.entries(songData)
      .filter(([key, value]) => value.original_song.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    onSearch(filteredData);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value);

    // 根据选定的年份筛选歌曲数据
    const filteredData = Object.entries(songData)
      .filter(([key, value]) => value.covers.some(cover => cover.release_year === parseInt(value)))
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
