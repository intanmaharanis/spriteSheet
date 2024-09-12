'use client';

import { AnimatedSprite, Container, Stage } from '@pixi/react';
import { Assets, Texture } from 'pixi.js';
import { useEffect, useState } from "react";

export default function Home() {
  const [frames, setFrames] = useState<Texture[]>([]);
  const spritesheet = "/assets/images/pohon.json";  // Ensure this path is correct

  useEffect(() => {
    const loadSpritesheet = async () => {
      try {
        const resource = await Assets.load(spritesheet);
        setFrames(
          Object.keys(resource.data.frames).map((frame) =>
            Texture.from(frame)
          )
        );
      } catch (error) {
        console.error("Error loading spritesheet:", error);
      }
    };

    loadSpritesheet();
  }, [spritesheet]);

  return (
    <Stage width={800} height={300} options={{ backgroundColor: 0xeef1f5 }}>
      <Container position={[400, 150]}>
        {frames.length > 0 && (
          <AnimatedSprite
            anchor={[1, 0.5]}
            textures={frames}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.1}
          />
        )}
      </Container>
    </Stage>
  );
}
