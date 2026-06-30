"use client";

import { useCallback, useRef } from "react";
import type { Sticker } from "../Playground";
import HomeButton from "./HomeButton";

type StickersProps = {
  stickers: Sticker[];
  palette: string[];
  onHome: () => void;
  onAdd: (emoji: string) => void;
  onMove: (id: number, x: number, y: number) => void;
  onClear: () => void;
};

export default function Stickers({
  stickers,
  palette,
  onHome,
  onAdd,
  onMove,
  onClear,
}: StickersProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<{ id: number; offX: number; offY: number } | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLSpanElement>, id: number) => {
      e.preventDefault();
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      const sticker = stickers.find((s) => s.id === id);
      if (!sticker) return;
      draggingRef.current = {
        id,
        offX: xPct - sticker.x,
        offY: yPct - sticker.y,
      };
    },
    [stickers]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      onMove(
        draggingRef.current.id,
        xPct - draggingRef.current.offX,
        yPct - draggingRef.current.offY
      );
    },
    [onMove]
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = null;
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeButton onHome={onHome} />

      {/* Stage */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {stickers.map((s) => (
          <span
            key={s.id}
            onPointerDown={(e) => handlePointerDown(e, s.id)}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: 52,
              cursor: "grab",
              userSelect: "none",
              touchAction: "none",
              transform: "translate(-50%, -50%)",
              animation: "pg-pop-in 0.3s ease-out both",
            }}
          >
            {s.e}
          </span>
        ))}

        {stickers.length === 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 24,
                margin: 0,
                textAlign: "center",
              }}
            >
              Tap a sticker below to place it!
            </p>
          </div>
        )}
      </div>

      {/* Palette */}
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
        {palette.map((e) => (
          <button
            key={e}
            onClick={() => onAdd(e)}
            style={{
              background: "rgba(255,255,255,0.35)",
              border: "none",
              borderRadius: 14,
              padding: "8px 10px",
              fontSize: 36,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            {e}
          </button>
        ))}
        <button
          onClick={onClear}
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
