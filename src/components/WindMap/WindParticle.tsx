import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { DataTexture } from 'three';
import vPassShader from './shader/v_pass.glsl';
import { createParticlePositionDataTexture, createWindVelocityDataTexture } from './util';

export default function WindParticle() {
  const numParticles = 300;
  const L = Math.floor(Math.sqrt(numParticles));
  const roughNumParticles = L ** 2;

  const { gl: renderer } = useThree();
  const state = useThree();
  console.log(vPassShader);

  const positions = useMemo(() => {
    return createParticlePositionDataTexture(roughNumParticles);
  }, []);

  const velocities = useMemo<DataTexture>(() => {
    return createWindVelocityDataTexture();
  }, []);

  const numVarPerPosition = 3;
  const vertices = useMemo<Float32Array>(() => {
    return new Float32Array(roughNumParticles * numVarPerPosition);
  }, []);

  useEffect(() => {
    renderer.setAnimationLoop(() => {});
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute args={[vertices, numVarPerPosition]} attach={'attributes-position'} />
      </bufferGeometry>
      {/* <pointsMaterial args={[{ color: 0xff0000, size: 1 }]} color={0xff0000} /> */}
      <shaderMaterial />
    </points>
  );
}
