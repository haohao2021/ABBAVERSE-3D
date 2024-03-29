// src/components/SongList.jsx
import React from 'react';
// import './SongList.css'; // 用于SongList组件的样式

const SongList = ({ songs }) => {
  // SongList的实现代码
  return (
    <ul className="song-list">
      {songs.map(song => (
        <li key={song.id}>{song.name}</li> // 假设每首歌都有唯一的id和name
      ))}
    </ul>
  );
};

export default SongList;
