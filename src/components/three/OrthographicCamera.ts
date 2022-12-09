import { OrthographicCamera as OrthCamera } from 'three';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

type OrthoCameraViewport = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  near?: number;
  far?: number;
};

export default function OrthographicCamera(props?: OrthoCameraViewport) {
  const state = useThree();

  if (!(state.camera instanceof OrthographicCamera)) {
    state.camera = new OrthCamera(props?.left, props?.right, props?.top, props?.bottom, props?.near, props?.far);
  }
  return null;
}
