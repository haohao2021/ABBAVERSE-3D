import axios from 'axios';
// 尝试改为默认导入方式
import { parse } from 'csv-parse';


async function parseCsvData(csvFilePath) {
  try {
    const response = await axios.get(csvFilePath);
    const csvData = response.data;
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });

    const songCoverData = {};

    records.forEach(({ Original, 'Artist Country': ArtistCountry }) => {
      if (!songCoverData[Original]) {
        songCoverData[Original] = {};
      }
      if (!songCoverData[Original][ArtistCountry]) {
        songCoverData[Original][ArtistCountry] = 0;
      }
      songCoverData[Original][ArtistCountry] += 1;
    });

    return songCoverData;
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    throw error; // 或者根据你的需要处理错误
  }
}

export default parseCsvData;
