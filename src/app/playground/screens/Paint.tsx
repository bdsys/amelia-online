"use client";

import { useCallback, useEffect, useRef } from "react";
import HomeButton from "./HomeButton";

type PaintProps = {
  color: string;
  colors: string[];
  onHome: () => void;
  onColorChange: (c: string) => void;
};

export default function Paint({ color, colors, onHome, onColorChange }: PaintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const colorRef = useRef(color);

  // Keep color ref in sync
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  // DPR-aware resize that preserves drawing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Save current drawing
    const tmp = document.createElement("canvas");
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    const tmpCtx = tmp.getContext("2d");
    tmpCtx?.drawImage(canvas, 0, 0);

    // Resize
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Restore
    ctx.drawImage(tmp, 0, 0, rect.width, rect.height);
  }, []);

  useEffect(() => {
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [resizeCanvas]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      isDrawingRef.current = true;
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.setPointerCapture(e.pointerId);
      const ctx = getCtx();
      if (!ctx) return;
      const pos = getPos(e);
      lastPointRef.current = pos;

      // Draw dot on pointer down
      ctx.fillStyle = colorRef.current;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
      ctx.fill();
    },
    [getCtx]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;
      const ctx = getCtx();
      if (!ctx) return;
      const pos = getPos(e);
      const last = lastPointRef.current;

      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth = 16;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      if (last) {
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pos.x, pos.y);
      }
      ctx.stroke();
      lastPointRef.current = pos;
    },
    [getCtx]
  );

  const handlePointerUp = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
  }, [getCtx]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeButton onHome={onHome} />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          flex: 1,
          display: "block",
          touchAction: "none",
          cursor: "crosshair",
          width: "100%",
        }}
      />

      {/* Controls */}
      <div
        style={{
          background: "rgba(255,255,255,0.20)",
          backdropFilter: "blur(8px)",
          padding: "12px 16px",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onColorChange(c)}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: c,
              border: c === color ? "4px solid #fff" : "4px solid transparent",
              cursor: "pointer",
              boxShadow: c === color ? "0 0 0 2px #444" : undefined,
              transition: "border 0.15s",
            }}
          />
        ))}
        <button
          onClick={handleClear}
          style={{
            background: "rgba(255,255,255,0.35)",
            border: "none",
            borderRadius: 14,
            padding: "8px 14px",
            fontSize: 16,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "#3b352e",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
