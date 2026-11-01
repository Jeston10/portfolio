"use client";

import * as React from "react";
import { playMechanicalPress } from "@/lib/sounds";

/**
 * The oversized 3D footer name, rendered as a button: it presses down into
 * its own extrusion and plays a mechanical key-switch click on press, both
 * synthesized with the Web Audio API so no audio asset is needed.
 */
export function FooterName({ name }: { name: string }) {
  const [pressed, setPressed] = React.useState(false);

  const press = () => {
    setPressed(true);
    playMechanicalPress();
  };
  const release = () => setPressed(false);

  return (
    <button
      type="button"
      aria-label={name}
      onPointerDown={press}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      className={`text-3d block cursor-pointer select-none whitespace-nowrap border-0 bg-transparent p-0 font-bold uppercase leading-[0.85] tracking-tight text-foreground outline-none [appearance:none] ${
        pressed ? "is-pressed" : ""
      }`}
      style={{ fontSize: "clamp(2.25rem, 13vw, 12rem)" }}
    >
      {name}
    </button>
  );
}
