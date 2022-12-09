import { css } from "@emotion/react"
import { useEffect, useRef, useState } from "react"
import { fromEvent } from "rxjs"
import { merge } from "rxjs/internal/observable/merge"
import { filter } from "rxjs/internal/operators/filter"
import { map } from "rxjs/internal/operators/map"
import { withLatestFrom } from "rxjs/internal/operators/withLatestFrom"
import { WebGLObjects } from "three"

type Props = {
  target: (props: { width: number, height: number }) => React.ReactElement,
  width: number,
  height: number

}

type Size = {
  width: number,
  height: number
}

type MousePressed = "on" | "off";

export default function Resizer({ target, width, height }: Props) {

  // const wrapper = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width, height })

  useEffect(() => {
    console.log("hi");

    // wrapper.current!.addEventListener("mousemove", () => { });
    const corner = cornerRef.current!

    const mousePress$ = merge<MousePressed[]>(
      fromEvent(corner, "mousedown").pipe(map(_ => "on")),
      fromEvent(window, "mouseup").pipe(map(_ => "off"))
    );

    const drag$ = fromEvent(window, "mousemove").pipe(
      withLatestFrom(mousePress$),
      filter(([_, press]) => press === "off"),
      map(([event, _]) => event)
    );

    drag$.subscribe((e) => {
      console.log(e);
    })
    // console.log(wrapper.current!.parentElement);







    // const a = withLatestFrom(
    //   fromEvent(corner, "mousedown").pipe(map(_ => "mousedown")),
    //   fromEvent(corner, "mouseup").pipe(map(_ => "mouseup")),
    //   fromEvent(corner, "mousedown").pipe(map(_ => "mousedown")),
    //   fromEvent(corner, "mouseup").pipe(map(_ => "mouseup"))
    // )


  }, [])

  return (
    <div css={css({ position: "relative", width, height })}>
      {target({ width, height })}
      <div ref={cornerRef} css={css({ width: 10, height: 10, background: "#ff000055", position: "absolute", bottom: 0, right: 0, zIndex: 1000, cursor: "nwse-resize" })}></div>
    </div>
  )
}