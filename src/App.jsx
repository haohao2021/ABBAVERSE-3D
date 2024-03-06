import React from "react";
import "./App.css"; // 用于App组件的样式
import Cobe from "./Cobe.jsx"; // 引入Cobe组件
import FilterPanel from "./FilterPanel.jsx"; // 引入筛选面板组件

function App() {
  return (
    <div className="App">
      <header className="App-header">ABBAVERSE</header>

      <main className="main">
        <div className="earth-container">
          <Cobe />
          {/* 你需要使用 Cobe 提供的元素和样式来渲染地球 */}
        </div>
        <div >
          <FilterPanel />
        </div>
        {/* 其他你可能需要的组件 */}
      </main>
    </div>
  );
}

export default App;
