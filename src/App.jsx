import React, { useState, useEffect } from "react";
import Cobe from "./Cobe.jsx"; 
// import FilterPanel from "./FilterPanel.jsx"; 
import data from "./data.json"; 

const App = () => {
  const [songData, setSongData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  // console.log(data)
  useEffect(() => {
    setSongData(data);
  }, []);

  const onSearch = (searchTerm) => {
    const result = Object.entries(songData).filter(([key, value]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );

    updateFilteredData(result);
  };

  const onFilter = (filterCriteria) => {
    const { year } = filterCriteria;
    const result = Object.entries(songData).filter(([key, value]) =>
      value.covers.some((cover) => cover.release_year === year)
    );

    updateFilteredData(result);
  };

  const updateFilteredData = (data) => {
    const markers = data
      .map(([key, value]) => {
        return value.covers.map((cover) => ({
          location: cover.location, 
          size: (cover.count * 0.01).toFixed(2), 
        }));
      })
      .flat();

    // // 使用静态 markers 测试
    //   const markers = [
    //     { location: [37.7749, -122.4194], size: 0.05 }, // 旧金山
    //     { location: [40.7128, -74.0060], size: 0.1 },  // 纽约
    //   ];

    setFilteredData(markers);
  };

  return (
    <div className="App">
      <header className="App-header">ABBAVERSE</header>

      <main className="main">
        <div className="earth-container">
          <Cobe markers={filteredData || []} />
        </div>
        {/* <div>
          <FilterPanel
            songData={songData}
            onSearch={onSearch}
            onFilter={onFilter}
          />
        </div> */}
      </main>
    </div>
  );
};

export default App;
