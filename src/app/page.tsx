'use client';

import { AnimatedSprite, Container, Stage } from '@pixi/react';
import { Assets, Texture } from 'pixi.js';
import { useEffect, useRef, useState } from "react";
import * as PIXI from 'pixi.js';

export default function Home() {
  const [frames, setFrames] = useState<Texture[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [positionX, setPositionX] = useState(400); // Initial horizontal position
  const spriteRef = useRef<PIXI.AnimatedSprite>(null);

  const spritesheet = "/assets/images/test.json";  // Path to your spritesheet JSON file

  const handleClick = () => {
    // Update current frame manually
    const nextFrame = (currentFrame + 1) % frames.length;
    setCurrentFrame(nextFrame);

    // Move the AnimatedSprite to the next frame manually
    if (spriteRef.current) {
      spriteRef.current.gotoAndStop(nextFrame);
    }

    // Move sprite position horizontally
    setPositionX(prevX => prevX + 10); // Move 10 pixels to the right per click
  };

  useEffect(() => {
    const loadSpritesheet = async () => {
      try {
        // Load the spritesheet
        const resource = await Assets.load(spritesheet);
        
        // Extract frames from spritesheet
        const loadedFrames = Object.keys(resource.data.frames).map((frameKey) =>
          Texture.from(frameKey)
        );

        setFrames(loadedFrames); // Set frames to AnimatedSprite
      } catch (error) {
        console.error("Error loading spritesheet:", error);
      }
    };

    loadSpritesheet(); // Trigger loading spritesheet
  }, [spritesheet]);

  return (
    <Stage width={800} height={300} options={{ backgroundColor: 0xeef1f5 }}>
      <Container position={[positionX, 150]}>
        {frames.length > 0 && (
          <AnimatedSprite
            ref={spriteRef} // Attach ref for manual control
            anchor={[1, 0.5]} // Anchor for positioning the sprite
            textures={frames} // Load sprite frames
            isPlaying={false} // Stop automatic animation
            initialFrame={0} // Start from the first frame
            animationSpeed={0.1} // Speed of animation (if playing)
            interactive={true} // Enable interaction
            pointerdown={handleClick} // Change frame and move position when clicked
          />
        )}
      </Container>
    </Stage>
  );
}
