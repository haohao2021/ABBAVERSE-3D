import React, { useState, useEffect } from "react";
import Cobe from "./Cobe.jsx";
import FilterPanel from "./FilterPanel.jsx";
import SearchResults from "./SearchResults.jsx"; // 引入SearchResults组件
import data from "./data.json";

const App = () => {
  const [songData, setSongData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchResults, setSearchResults] = useState({}); // 新增状态来存储搜索结果

  useEffect(() => {
    setSongData(data);
  }, []);

  const onSearch = (filteredData) => {
    setSearchResults(filteredData); // 更新搜索结果而不是直接过滤标记
  };

  // 实现updateGlobalMarkers函数来根据用户选择的单曲更新标记
  const updateGlobalMarkers = (selectedSong) => {
    const markers = Object.values(selectedSong.covers).flatMap(cover =>
      cover.details.map(detail => ({
        location: cover.location,
        size: (detail.count * 0.01).toFixed(2), // 假设每个cover有count属性
      }))
    );
    setFilteredData(markers);
  };

  return (
    <div className="App">
      <header className="App-header">ABBAVERSE</header>

      <main className="main">
        <div className="earth-container">
          <Cobe markers={filteredData} />
        </div>
        <div>
          <FilterPanel songData={songData} onSearch={onSearch} />
          {/* 展示搜索结果并处理单曲选择 */}
          <SearchResults results={searchResults} onSelectSong={updateGlobalMarkers} />
        </div>
      </main>
    </div>
  );
};

export default App;
