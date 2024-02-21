import React from 'react';
import Cobe from './Cobe.jsx';
// import Dashboard from './Dashboard.jsx';

function App() {
  // const [selectedSongs, setSelectedSongs] = useState([]);

  // 假设处理选中歌曲的逻辑
  // const handleSelectSong = (songName) => {
    // 更新 selectedSongs 状态的逻辑
  // };

  return (
    <div>
      {/* 由于已删除与 CSV 数据处理相关的代码，Dashboard 组件的相关功能也被注释掉 */}
      {/* <Dashboard onSongSelect={handleSelectSong} /> */}
      <Cobe selectedSongs={[]} />
    </div>
  );
}

export default App;
