import React, { useState, useEffect } from "react";
import Cobe from "./Cobe.jsx"; // 引入Cobe组件
import FilterPanel from "./FilterPanel.jsx"; // 引入筛选面板组件
import data from "./data.json"; // 直接从 src 文件夹引入 JSON 数据

const App = () => {
  // 存储完整的歌曲数据和筛选结果
  const [songData, setSongData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  // console.log(data)
  // 加载并设置初始歌曲数据
  useEffect(() => {
    setSongData(data);
  }, []);

  // 搜索歌曲
  const onSearch = (searchTerm) => {
    // 根据搜索词筛选歌曲
    const result = Object.entries(songData).filter(([key, value]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 更新filteredData以反映搜索结果
    updateFilteredData(result);
  };

  // 根据年份筛选
  const onFilter = (filterCriteria) => {
    const { year } = filterCriteria;
    const result = Object.entries(songData).filter(([key, value]) =>
      value.covers.some((cover) => cover.release_year === year)
    );

    // 更新filteredData以反映筛选结果
    updateFilteredData(result);
  };

  // 更新filteredData并转换为Cobe组件所需的markers格式
  const updateFilteredData = (data) => {
    const markers = data
      .map(([key, value]) => {
        // 假设每个国家的翻唱次数转换为大小
        // 这需要根据您的实际数据结构进行调整
        return value.covers.map((cover) => ({
          location: cover.location, // 需要将国家名转换为经纬度
          size: cover.count * 0.01, // 假设翻唱次数转换为大小
        }));
      })
      // .flat();

    setFilteredData(markers);
  };

  return (
    <div className="App">
      <header className="App-header">ABBAVERSE</header>

      <main className="main">
        <div className="earth-container">
          <Cobe markers={filteredData || []} />
          {/* 你需要使用 Cobe 提供的元素和样式来渲染地球 */}
        </div>
        <div>
          <FilterPanel
            songData={songData}
            onSearch={onSearch}
            onFilter={onFilter}
          />
        </div>
        {/* 其他你可能需要的组件 */}
      </main>
    </div>
  );
};

export default App;
