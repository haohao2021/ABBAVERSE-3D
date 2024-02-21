import React, { useEffect, useRef } from "react";
import { useSpring, animated } from 'react-spring';
import createGlobe from "cobe";

export default function Cobe() {
  const canvasRef = useRef();
  // 使用 useSpring 控制 globe 的旋转
  const [{ phi, theta }, api] = useSpring(() => ({
    phi: 0,
    theta: 0,
    config: { mass: 1, tension: 280, friction: 40, precision: 0.001 },
  }));
  let isDragging = false; // 追踪拖拽状态

  useEffect(() => {
    // 准备 globe 的 markers
    const markers = [
      { location: [54.0, -2.0], size: 0.01 },
      { location: [-27.0, 133.0], size: 0.08 },
      { location: [42.8333, 12.8333], size: 0.07 },
      { location: [62.0, 10.0], size: 0.03 },
      { location: [-29.0, 24.0], size: 0.03 },
      { location: [54.0, -2.0], size: 0.28 },
      { location: [51.0, 9.0], size: 0.1 },
      { location: [59.0, 26.0], size: 0.01 },
      { location: [62.0, 15.0], size: 0.12 },
      { location: [-41.0, 174.0], size: 0.02 },
      { location: [56.0, 10.0], size: 0.01 },
      { location: [38.0, -97.0], size: 0.23 },
      { location: [53.0, -8.0], size: 0.01 },
      { location: [50.8333, 4.0], size: 0.01 },
      { location: [47.0, 20.0], size: 0.02 },
      { location: [64.0, 26.0], size: 0.03 },
      { location: [36.0, 138.0], size: 0.01 },
      { location: [44.0, 21.0], size: 0.01 },
      { location: [46.0, 15.0], size: 0.01 },
      { location: [60.0, -95.0], size: 0.01 },
      { location: [48.6667, 19.5], size: 0.01 },
      { location: [46.0, 2.0], size: 0.02 },
      { location: [49.75, 15.5], size: 0.01 },
      { location: [44.0, 18.0], size: 0.01 },
      { location: [-34.0, -64.0], size: 0.02 },
      { location: [52.5, 5.75], size: 0.01 },
      { location: [-10.0, -55.0], size: 0.01 },
      { location: [20.0, 77.0], size: 0.01 },
      { location: [23.0, -102.0], size: 0.01 }
    ];

    // 初始化 globe
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: canvasRef.current.offsetWidth * 2,
      height: canvasRef.current.offsetWidth * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [0.5, 0.5, 1], // 浅蓝色
      glowColor: [1.2, 1.2, 1.2],
      markers,
      onRender: (state) => {
        state.phi = phi.get();
        state.theta = theta.get();
      },
    });

    setTimeout(() => canvasRef.current.style.opacity = '1', 0);

    // 鼠标事件处理逻辑
    const handlePointerDown = (e) => {
      if (e.button === 0) {
        isDragging = true;
        canvasRef.current.setPointerCapture(e.pointerId);
      }
    };

    const handlePointerMove = (e) => {
      if (isDragging) {
        const movementX = e.movementX;
        const movementY = e.movementY;
        api.start({
          phi: phi.get() + movementX * 0.01,
          theta: theta.get() + movementY * 0.01,
        });
      }
    };

    const handlePointerUp = (e) => {
      if (e.button === 0) {
        isDragging = false;
        canvasRef.current.releasePointerCapture(e.pointerId);
      }
    };

    // 添加事件监听
    canvasRef.current.addEventListener('pointerdown', handlePointerDown);
    canvasRef.current.addEventListener('pointermove', handlePointerMove);
    canvasRef.current.addEventListener('pointerup', handlePointerUp);
    canvasRef.current.addEventListener('pointerout', handlePointerUp);

    return () => {
      // 清理事件监听和 globe 实例
      globe?.destroy();
      canvasRef.current.removeEventListener('pointerdown', handlePointerDown);
      canvasRef.current.removeEventListener('pointermove', handlePointerMove);
      canvasRef.current.removeEventListener('pointerup', handlePointerUp);
      canvasRef.current.removeEventListener('pointerout', handlePointerUp);
    };
  }, [api, phi, theta]);

  return (
    <div style={{ width: '100%', maxWidth: 600, aspectRatio: '1', margin: 'auto', position: 'relative' }}>
      <animated.canvas ref={canvasRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
    </div>
  );
}

//--------------------------------------

// import React, { useEffect, useRef } from "react";
// import { useSpring, animated } from 'react-spring';
// import createGlobe from "cobe";
// import { csv } from 'd3-fetch';

// export default function Cobe() {
//   const canvasRef = useRef();
//   // 使用 useSpring 控制 globe 的旋转
//   const [{ phi, theta }, api] = useSpring(() => ({
//     phi: 0,
//     theta: 0,
//     config: { mass: 1, tension: 280, friction: 40, precision: 0.001 },
//   }));
//   let isDragging = false; // 追踪拖拽状态

//   useEffect(() => {
//     // 加载并处理 CSV 数据
//     csv('/public/database.csv').then(data => {
//       const coverCounts = {}; // { 国家名: { count: 翻唱次数, coordinates: [纬度, 经度] } }

//       data.forEach(row => {
//         const country = row['Artist Country'];
//         const coordinateStr = row['Coordinate'];
        
//         if (!coordinateStr) {
//           console.error(`Missing or undefined 'Coordinate' field for country: ${country}`);
//           return; // 跳过当前迭代
//         }
        
//         let coordinates;
//         try {
//           // 尝试直接解析 JSON
//           coordinates = JSON.parse(row['Coordinate']);
//         } catch (error) {
//           console.error(`Direct JSON parse failed for ${row['Artist Country']}, attempting alternative parsing.`);
//           // 尝试备用解析策略，例如移除额外的引号、空格等
//           const cleanedString = row['Coordinate'].trim().replace(/^"|"$/g, '');
//           try {
//             coordinates = JSON.parse(cleanedString);
//           } catch (error) {
//             console.error(`Alternative parsing also failed for ${row['Artist Country']}:`, error);
//             return; // 跳过这
//           }
        
//         // 确保解析后的 coordinates 是有效的经纬度数组
//         if (!Array.isArray(coordinates) || coordinates.length !== 2) {
//           console.error(`Invalid coordinates format for country: ${country}. Expected an array of 2 elements, got:`, coordinates);
//           return; // 跳过当前迭代
//         }

//         if (!coverCounts[country]) {
//           coverCounts[country] = { count: 1, coordinates };
//         } else {
//           coverCounts[country].count += 1;
//         }
//       }});

//       // 准备 globe 的 markers
//       const markers = Object.values(coverCounts).map(({ count, coordinates }) => ({
//         location: coordinates,
//         size: Math.log(count + 1) * 0.01, // 使用对数调整大小
//       }));

//       // 初始化 globe
//       const globe = createGlobe(canvasRef.current, {
//         devicePixelRatio: 2,
//         width: canvasRef.current.offsetWidth * 2,
//         height: canvasRef.current.offsetWidth * 2,
//         phi: 0,
//         theta: 0,
//         dark: 1,
//         diffuse: 3,
//         mapSamples: 16000,
//         mapBrightness: 1.2,
//         baseColor: [1, 1, 1],
//         markerColor: [251 / 255, 100 / 255, 21 / 255],
//         glowColor: [1.2, 1.2, 1.2],
//         markers,
//         onRender: (state) => {
//           state.phi = phi.get();
//           state.theta = theta.get();
//         },
//       });

//       setTimeout(() => canvasRef.current.style.opacity = '1', 0);
//     });

//     // 鼠标事件处理逻辑
//     const handlePointerDown = (e) => {
//       if (e.button === 0) {
//         isDragging = true;
//         canvasRef.current.setPointerCapture(e.pointerId);
//       }
//     };

//     const handlePointerMove = (e) => {
//       if (isDragging) {
//         const movementX = e.movementX;
//         const movementY = e.movementY;
//         api.start({
//           phi: phi.get() + movementX * 0.01,
//           theta: theta.get() + movementY * 0.01,
//         });
//       }
//     };

//     const handlePointerUp = (e) => {
//       if (e.button === 0) {
//         isDragging = false;
//         canvasRef.current.releasePointerCapture(e.pointerId);
//       }
//     };

//     // 添加事件监听
//     canvasRef.current.addEventListener('pointerdown', handlePointerDown);
//     canvasRef.current.addEventListener('pointermove', handlePointerMove);
//     canvasRef.current.addEventListener('pointerup', handlePointerUp);
//     canvasRef.current.addEventListener('pointerout', handlePointerUp);

//     return () => {
//       // 清理事件监听和 globe 实例
//       globe?.destroy();
//       canvasRef.current.removeEventListener('pointerdown', handlePointerDown);
//       canvasRef.current.removeEventListener('pointermove', handlePointerMove);
//       canvasRef.current.removeEventListener('pointerup', handlePointerUp);
//       canvasRef.current.removeEventListener('pointerout', handlePointerUp);
//     };
//   }, [api, phi, theta]);

//   return (
//     <div style={{ width: '100%', maxWidth: 600, aspectRatio: '1', margin: 'auto', position: 'relative' }}>
//       <animated.canvas ref={canvasRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
//     </div>
//   );
// }
