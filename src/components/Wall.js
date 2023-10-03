
/*
// Wall.js
import React from 'react';

const Wall = ({ x, y, width, height }) => {
  const wallStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'blue', // Couleur des murs
  };

  return <div style={wallStyle} />;
};

export default Wall;
*/


import React from 'react';
import { Container, Graphics } from '@pixi/react';

const Wall = ({ x, y, width, height }) => {
  return (
    <Container x={x} y={y}>
      <Graphics>
        {/* Dessinez un rectangle pour représenter le mur */}
        <Graphics.Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={0x000000} // Couleur du mur (noir)
        />
      </Graphics>
    </Container>
  );
};

export default Wall;



