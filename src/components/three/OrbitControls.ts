import { useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsObj } from 'three/examples/jsm/controls/OrbitControls.js';
import { useEffect } from 'react';

export default function OrbitControls() {
  const state = useThree();
  const { camera, gl } = state;

  if (!state.controls) {
    state.controls = new OrbitControlsObj(camera, gl.domElement);
  }

  useEffect(() => {
    state.controls = new OrbitControlsObj(camera, gl.domElement);

    return () => {
      if (state.controls instanceof OrbitControlsObj) {
        state.controls.dispose();
      }
    };
  }, [camera, gl]);
  return null;
}
