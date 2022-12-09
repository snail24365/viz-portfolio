import React from 'react';
import { css } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import WindParticle from './WindParticle';
import OrthographicCamera from './../three/OrthographicCamera';
import OrbitControls from './../three/OrbitControls';

export default function WindMapContainer() {
  return (
    <div>
      <div>
        <input type="number" placeholder="x해상도" />
        <input type="number" placeholder="y해상도" />
      </div>
      <div css={css({ width: 1000, height: 1000, border: '1px solid black' })}>
        <Canvas>
          <OrthographicCamera left={-0.5} right={0.5} top={0.5} bottom={-0.5} near={-1} far={1} />
          <OrbitControls />
          <WindParticle />
        </Canvas>
      </div>
    </div>
  );
}
