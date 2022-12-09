import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Key } from 'ts-keycode-enum';
import { css } from '@emotion/react';
import { Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GridLine from './../../model/grid';

type Props = {
  width?: number;
  height?: number;
  resolution?: { x: number; y: number };
};

export default function GridDisplay(props: Props) {
  const canvasCss = css({
    width: '100%',
    height: '100%',
    border: '1px solid black',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log('hi');

  useEffect(() => {
    const canvas = canvasRef.current!;

    const scene = new THREE.Scene();

    let { width: W, height: H } = props;

    const { width: canvasW, height: canvasH } = canvas.getClientRects()[0];
    if (!W) {
      W = canvasW;
    }

    if (!H) {
      H = canvasH;
    }

    const halfW = W / 2;
    const halfH = H / 2;
    const camera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, -1, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvas);
    // controls.enableDamping = true;
    controls.enableZoom = true;

    const rayCaster = new THREE.Raycaster();

    const resolutionX = props.resolution?.x ?? W;
    const resolutionY = props.resolution?.y ?? H;
    console.log(resolutionX, resolutionY);

    // Scene 구성 + 카메라 위치 잡기
    // const planeGeometry = new THREE.PlaneGeometry(W, H, resolutionX, resolutionY);
    // const plane = new Mesh(
    //   planeGeometry,
    //   new MeshBasicMaterial({
    //     // wireframe: true,
    //     color: 0xaaaaaa,
    //   }),
    // );
    // scene.add(plane);

    // const material = new THREE.LineBasicMaterial({
    //   color: 0xffffff,
    // });

    // const points: Vector3[] = [];

    // for (let r = 0; r <= resolutionY; r++) {
    //   const alpha = r / resolutionY;
    //   let p1 = new Vector3(-halfW, -halfH + alpha * H);
    //   let p2 = new Vector3(halfW, -halfH + alpha * H);

    //   if (r % 2 == 1) {
    //     [p1, p2] = [p2, p1];
    //   }
    //   points.push(p1, p2);
    // }
    // const lastOne = points[points.length - 1];
    // points.push(new Vector3(lastOne.x, -halfH));

    // for (let c = 0; c <= resolutionX; c++) {
    //   const alpha = c / resolutionX;
    //   let p1 = new Vector3(-halfW + alpha * W, -halfH);
    //   let p2 = new Vector3(-halfW + alpha * W, halfH);

    //   if (c % 2 == 1) {
    //     [p1, p2] = [p2, p1];
    //   }
    //   points.push(p1, p2);
    //   // addLine(p1, p2);
    // }
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const line = new THREE.Line(geometry, material);
    const line = new GridLine(resolutionX, resolutionY);
    line.scale.set(W, H, 1);
    scene.add(line);

    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      renderer.setAnimationLoop(tick); // 재귀함수로 tick 재호출함
    };
    tick();

    // keyObservable("keydown", "KeyQ").subscribe((_) => { state.qPressed = true; });
    // keyObservable("keyup", "KeyQ").subscribe((_) => { state.qPressed = false; });
    // const mouseHoverObs = fromEvent(canvas, "mousemove").pipe(
    //     map(({ clientX, clientY }) => ({ x: clientX - halfW, y:  halfH - clientY })),
    // )

    // const cellHoverObs = mouseHoverObs.pipe(
    //     map(({ x, y }) => {
    //         rayCaster.set(new Vector3(x, y, 0), new Vector3(x, y, -1))
    //         return rayCaster.intersectObjects(scene.children)[0];
    //     }),
    //     filter(intersected => intersected !== undefined),
    //     map(({ faceIndex, face }) => {
    //         const minVertexIdx = _.min([face.a, face.b, face.c])
    //         const cellNo = parseInt(faceIndex / 2);
    //         return {
    //             cellNo,
    //             cellVerticesNo: Array(4).fill(minVertexIdx).map((x, i) => x + i),
    //             row: Math.floor(cellNo / resolutionY),
    //             col: cellNo % resolutionY,
    //        };
    //     })
    //       ).subscribe(console.log);

    // function keyObservable(eventType: WindowEventMap, keyCode: Key, target = window) {
    //     return fromEvent(target, eventType).pipe(
    //         map(({
    //             code
    //         }) => code),
    //         filter((code) => code === keyCode)
    //     );
    // }
  });

  return (
    <>
      <canvas ref={canvasRef} css={canvasCss}></canvas>
    </>
  );
}
