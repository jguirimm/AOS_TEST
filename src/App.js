import React, { useEffect, useState, useCallback } from 'react';
import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Wall from './components/Wall' ;


export const App = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);
  const gridSize = { width: 800, height: 600 }; // Taille de la grille
  const pacmanSize = { width: 50, height: 50 }; // Taille du PACMAN
  const [position, setPosition] = useState({ x: 400, y: 300 }); // Position initiale

  // Direction du mouvement automatique (0: immobile, 1: gauche, 2: droite, 3: haut, 4: bas)
  const [autoMoveDirection, setAutoMoveDirection] = useState(0);

  useEffect(() => {
    // Fonction pour gérer le mouvement automatique aléatoire
    const handleAutoMove = () => {
      const randomDirection = Math.floor(Math.random() * 5); // 0 à 4 (5 directions possibles)

      // Évitez de choisir la direction opposée à la direction actuelle
      if (randomDirection === 1 && autoMoveDirection === 2) return;
      if (randomDirection === 2 && autoMoveDirection === 1) return;
      if (randomDirection === 3 && autoMoveDirection === 4) return;
      if (randomDirection === 4 && autoMoveDirection === 3) return;

      setAutoMoveDirection(randomDirection);
    };

    // Démarrez le mouvement automatique toutes les 500 millisecondes (0.5 seconde)
    const autoMoveInterval = setInterval(handleAutoMove, 400);

    return () => {
      clearInterval(autoMoveInterval); // Arrêtez le mouvement automatique lorsque le composant est démonté
    };
  }, [autoMoveDirection]);

  // Fonction pour gérer le mouvement dirigé par les touches
  const handleKeyDown = useCallback(
    (e) => {
      // Déplacez le personnage en réponse aux touches fléchées
      switch (e.key) {
        case 'ArrowLeft':
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.max(prevPosition.x - 20, 0), // Limite gauche
          }));
          setAutoMoveDirection(0); // Arrête le mouvement automatique
          break;
        case 'ArrowRight':
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.min(prevPosition.x + 20, gridSize.width - pacmanSize.width), // Limite droite
          }));
          setAutoMoveDirection(0); // Arrête le mouvement automatique
          break;
        case 'ArrowUp':
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.max(prevPosition.y - 20, 0), // Limite supérieure
          }));
          setAutoMoveDirection(0); // Arrête le mouvement automatique
          break;
        case 'ArrowDown':
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.min(prevPosition.y + 20, gridSize.height - pacmanSize.height), // Limite inférieure
          }));
          setAutoMoveDirection(0); // Arrête le mouvement automatique
          break;
        default:
          break;
      }
    },
    [gridSize.width, gridSize.height, pacmanSize.width, pacmanSize.height]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Fonction pour gérer le mouvement automatique
  useEffect(() => {
    const handleAutoMove = () => {
      switch (autoMoveDirection) {
        case 1:
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.max(prevPosition.x - 20, 0), // Limite gauche
          }));
          break;
        case 2:
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.min(prevPosition.x + 20, gridSize.width - pacmanSize.width), // Limite droite
          }));
          break;
        case 3:
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.max(prevPosition.y - 20, 0), // Limite supérieure
          }));
          break;
        case 4:
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.min(prevPosition.y + 20, gridSize.height - pacmanSize.height), // Limite inférieure
          }));
          break;
        default:
          break;
      }
    };

    // Démarrez le mouvement automatique toutes les 250 millisecondes (0.25 seconde)
    const autoMoveInterval = setInterval(handleAutoMove, 110);

    return () => {
      clearInterval(autoMoveInterval); // Arrêtez le mouvement automatique lorsque le composant est démonté
    };
  }, [autoMoveDirection, gridSize.width, gridSize.height, pacmanSize.width, pacmanSize.height]);

  return (
    <Stage width={gridSize.width} height={gridSize.height}>
      <Container>

        {/* Ajoutez des murs */}
        <Wall x={100} y={100} width={20} height={200} />
        <Wall x={300} y={300} width={200} height={20} />
      
        {/* Ajoutez le PACMAN */}
        <Container x={position.x} y={position.y}>
          <Sprite image="PACMAN.png" anchor={0.1} scale={0.09} />
          <Text text=" " anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
        </Container>
      </Container>
    </Stage>
  );
};

export default App;


// Utilisation  de du composant Wall
/*
import React, { useEffect, useState } from 'react';
import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import Wall from './components/wall.js';

// Pour l'utilisation du mur
const wallPositions = [
  { x: 100, y: 100, width: 20, height: 200 },
  { x: 200, y: 100, width: 20, height: 200 },
  { x: 100, y: 100, width: 120, height: 20 },
  { x: 100, y: 280, width: 120, height: 20 },
  // Ajoutez d'autres positions de murs ici
];

export const App = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);
  const gridSize = { width: 800, height: 600 }; // Taille de la grille
  const pacmanSize = { width: 50, height: 50 }; // Taille du PACMAN
  const [position, setPosition] = useState({ x: 400, y: 300 }); // Position initiale

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Déplace l'image en réponse aux touches fléchées
      switch (e.key) {
        case 'ArrowLeft':
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.max(prevPosition.x - 10, 0), // Limite gauche
          }));
          break;
        case 'ArrowRight':
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: Math.min(prevPosition.x + 10, gridSize.width - pacmanSize.width), // Limite droite
          }));
          break;
        case 'ArrowUp':
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.max(prevPosition.y - 10, 0), // Limite supérieure
          }));
          break;
        case 'ArrowDown':
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.min(prevPosition.y + 10, gridSize.height - pacmanSize.height), // Limite inférieure
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gridSize.height, gridSize.width, pacmanSize.height, pacmanSize.width]);

  return (
    <Stage width={gridSize.width} height={gridSize.height}>
      <Container>
        {wallPositions.map((position, index) => (
          <Wall key={index} {...position} />
        ))}
  
        <Container x={position.x} y={position.y}>
          <Sprite image="pacman_bleu.png" anchor={0.1} scale={0.09} />
          <Text text=" " anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
        </Container>
      </Container>
    </Stage>
  );
};



export default App;



*/
