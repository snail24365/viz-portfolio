import * as THREE from 'three';
import { DataTexture } from 'three';

export function createDataTexture(
  width: number,
  height: number,
  dataType: 'int' | 'float',
  filter: THREE.TextureFilter = THREE.NearestFilter,
  pixelFormat: THREE.PixelFormat = THREE.RGBAFormat,
): DataTexture {
  const numElementPerVertex = 4;
  const size = width * height;
  const textureDataType = dataType === 'int' ? THREE.UnsignedIntType : THREE.FloatType;
  const dataSize = numElementPerVertex * size;
  const data = dataType === 'int' ? new Uint8Array(dataSize) : new Float32Array(dataSize);

  const texture = new THREE.DataTexture(
    data,
    width,
    height,
    pixelFormat,
    textureDataType,
    undefined,
    undefined,
    undefined,
    filter,
    filter,
  );
  texture.needsUpdate = true;
  return texture;
}

// export function hslToRgb(h, s, l) {
//   var r, g, b;

//   if (s == 0) {
//     r = g = b = l; // achromatic
//   } else {
//     var hue2rgb = function hue2rgb(p, q, t) {
//       if (t < 0) t += 1;
//       if (t > 1) t -= 1;
//       if (t < 1 / 6) return p + (q - p) * 6 * t;
//       if (t < 1 / 2) return q;
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     };

//     var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     var p = 2 * l - q;
//     r = hue2rgb(p, q, h + 1 / 3);
//     g = hue2rgb(p, q, h);
//     b = hue2rgb(p, q, h - 1 / 3);
//   }

//   return [r, g, b];
// }
