import { DataTexture } from 'three';
import windVxData from '../../data/wind-velocity/u-component.json';
import windVyData from '../../data/wind-velocity/v-component.json';
import { createDataTexture } from '../../util/util';
import * as THREE from 'three';

export function createWindVelocityDataTexture() {
  const { data: vx, header: header } = windVxData[0];
  const { data: vy } = windVyData[0];
  const { nx, ny } = header;
  const texture = createDataTexture(nx, ny, 'float', THREE.LinearFilter, THREE.RGBAFormat);
  for (let y = 0; y < ny; y++) {
    for (let x = 0; x < nx; x++) {
      const index = y * nx + x;
      texture.image.data[4 * index] = vx[index];
      texture.image.data[4 * index + 1] = vy[index];
    }
  }
  return texture;
}

export function createParticlePositionDataTexture(roughCount: number) {
  if (roughCount < 1) {
    throw new Error('invalid roughCount (should be greater than zero)');
  }
  const L = Math.floor(Math.sqrt(roughCount));
  // const { header: header } = windVxData[0];
  // const { nx, ny } = header;
  return createDataTexture(L, L, 'float', THREE.LinearFilter, THREE.RGBAFormat);
}
