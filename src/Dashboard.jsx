import React, { useState, useEffect } from 'react';
import createGlobe from 'cobe';
import { parse } from 'papaparse';
import axios from 'axios';

const Dashboard = () => {
  const [songs, setSongs] = useState([]); // 存储歌曲及其坐标数据
  const [searchTerm, setSearchTerm] = useState(''); // 搜索词
  const [selectedSongs, setSelectedSongs] = useState([]); // 选中的歌曲

  useEffect(() => {
    // 假设你的CSV文件可以通过某个URL访问
    
    axios.get('/database.csv').then((response) => {
      parse(response.data, {
        header: true,
        complete: (result) => {
          console.log(result.data);
          // 假设每行数据格式为 { Original: 'Song Name', Coordinate: 'lat,lng', ...其他数据 }
          setSongs(result.data.map(row => ({
            name: row.Original,
            coordinate: row.Coordinate
          }))); // 将歌曲名称和坐标存储到状态中
        }
      });
    });
  }, []);

  // 处理搜索逻辑
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 处理歌曲选择逻辑
  const handleSelectSong = (song) => {
    const isSelected = selectedSongs.some(selected => selected.name === song.name);
    if (isSelected) {
      setSelectedSongs(selectedSongs.filter(selected => selected.name !== song.name));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  // 筛选显示的歌曲列表
  // const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSongs = songs.filter(song => song && song.name && song.name.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div style={{ position: 'fixed', right: 0, top: 0, width: '300px', height: '100vh', overflow: 'auto' }}>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search songs" />
      <ul>
        {filteredSongs.map((song, index) => (
          <li key={index} onClick={() => handleSelectSong(song)}>
            {song.name} {selectedSongs.some(selected => selected.name === song.name) ? '✓' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
