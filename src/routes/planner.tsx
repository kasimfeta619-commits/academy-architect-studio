import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Planner — Academy Architect Studio" },
      { name: "description", content: "Sketch your floor plan and generate a 3D architectural preview with AI." },
      { property: "og:title", content: "AI Planner — Academy Architect Studio" },
      { property: "og:description", content: "Sketch your floor plan and generate a 3D architectural preview with AI." },
    ],
  }),
  component: PlannerPage,
});

type Line = { x1: number; y1: number; x2: number; y2: number };

function PlannerPage() {
  const { t } = useI18n();
  const [lines, setLines] = useState<Line[]>([]);
  const [drawing, setDrawing] = useState<Line | null>(null);
  const [style, setStyle] = useState("modern");
  const [material, setMaterial] = useState("wood");
  const [floors, setFloors] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [rendered, setRendered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const GRID = 20;

  const svgPt = (e: React.PointerEvent) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / GRID) * GRID;
    const y = Math.round((e.clientY - rect.top) / GRID) * GRID;
    return { x, y };
  };

  // 3D rotation state
  const [rot, setRot] = useState({ x: -25, y: 35 });
  const [zoom, setZoom] = useState(1);
  const dragRef = useRef<{ startX: number; startY: number; rx: number; ry: number } | null>(null);

  const on3DDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, rx: rot.x, ry: rot.y };
  };
  const on3DMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setRot({ x: dragRef.current.rx - dy * 0.4, y: dragRef.current.ry + dx * 0.4 });
  };
  const on3DUp = () => { dragRef.current = null; };

  useEffect(() => {
    const el = document.getElementById("threed-viewport");
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => Math.max(0.4, Math.min(2.5, z - e.deltaY * 0.001)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const generate = () => {
    setGenerating(true);
    setRendered(false);
    setTimeout(() => {
      setGenerating(false);
      setRendered(true);
    }, 2200);
  };

  const floorH = 60;
  const buildingW = 220 * zoom;
  const buildingD = 160 * zoom;
  const totalH = floorH * floors * zoom;

  return (
    <div className="bg-white min-h-screen">
      <div className="container-editorial py-12">
        <div className="max-w-2xl">
          <div className="eyebrow">{t("nav.planner")}</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl text-black">{t("planner.title")}</h1>
          <p className="mt-3 text-neutral-600">{t("planner.subtitle")}</p>
          <p className="mt-1 text-xs text-neutral-400">{t("planner.hint")}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* LEFT — 2D sketch */}
          <div className="border border-neutral-200 rounded-md bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
              <div className="eyebrow text-black">{t("planner.canvas")}</div>
              <button onClick={() => setLines([])} className="text-xs text-neutral-500 hover:text-black underline underline-offset-4">
                {t("planner.clear")}
              </button>
            </div>
            <div className="p-4">
              <svg
                ref={svgRef}
                viewBox="0 0 600 420"
                className="w-full h-[420px] bg-white border border-neutral-100 touch-none cursor-crosshair"
                onPointerDown={(e) => {
                  const p = svgPt(e);
                  setDrawing({ x1: p.x, y1: p.y, x2: p.x, y2: p.y });
                }}
                onPointerMove={(e) => {
                  if (!drawing) return;
                  const p = svgPt(e);
                  setDrawing({ ...drawing, x2: p.x, y2: p.y });
                }}
                onPointerUp={() => {
                  if (drawing && (drawing.x1 !== drawing.x2 || drawing.y1 !== drawing.y2)) {
                    setLines([...lines, drawing]);
                  }
                  setDrawing(null);
                }}
              >
                <defs>
                  <pattern id="grid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                    <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#f0f0f0" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="600" height="420" fill="url(#grid)" />
                {lines.map((l, i) => (
                  <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#000" strokeWidth="4" strokeLinecap="round" />
                ))}
                {drawing && (
                  <line x1={drawing.x1} y1={drawing.y1} x2={drawing.x2} y2={drawing.y2} stroke="#888" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" />
                )}
              </svg>

              {/* Params */}
              <div className="mt-4 grid gap-3 grid-cols-3">
                <div>
                  <label className="text-[0.65rem] uppercase tracking-widest text-neutral-500 block mb-1">{t("planner.style")}</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full border border-neutral-200 rounded-sm px-2 py-1.5 text-sm bg-white text-black">
                    <option value="modern">Modern</option>
                    <option value="alpine">Alpine Chalet</option>
                    <option value="scandi">Scandinavian</option>
                    <option value="minimal">Minimalist</option>
                  </select>
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-widest text-neutral-500 block mb-1">{t("planner.material")}</label>
                  <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full border border-neutral-200 rounded-sm px-2 py-1.5 text-sm bg-white text-black">
                    <option value="wood">Wood</option>
                    <option value="stucco">Stucco</option>
                    <option value="stone">Stone</option>
                    <option value="concrete">Concrete</option>
                  </select>
                </div>
                <div>
                  <label className="text-[0.65rem] uppercase tracking-widest text-neutral-500 block mb-1">{t("planner.floors")}</label>
                  <select value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="w-full border border-neutral-200 rounded-sm px-2 py-1.5 text-sm bg-white text-black">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generate}
                disabled={generating}
                className="mt-4 w-full inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60"
              >
                {generating ? t("planner.generating") : t("planner.generate")}
              </button>
            </div>
          </div>

          {/* RIGHT — 3D preview */}
          <div className="border border-neutral-200 rounded-md bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
              <div className="eyebrow text-black">{t("planner.preview3d")}</div>
              <div className="text-[0.65rem] uppercase tracking-widest text-neutral-400">drag · scroll to zoom</div>
            </div>
            <div
              id="threed-viewport"
              className="relative h-[540px] bg-white overflow-hidden touch-none select-none"
              style={{ perspective: "1400px" }}
              onPointerDown={on3DDown}
              onPointerMove={on3DMove}
              onPointerUp={on3DUp}
              onPointerCancel={on3DUp}
            >
              {generating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-2 border-neutral-200 rounded-full" />
                    <div className="absolute inset-0 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="mt-6 text-sm font-medium text-black tracking-wide">{t("planner.generating")}</div>
                  <div className="mt-2 text-xs text-neutral-400">Academy Architect Studio</div>
                </div>
              )}

              {!generating && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
                      transition: "transform 0.05s linear",
                    }}
                  >
                    {/* Ground plane */}
                    <div
                      style={{
                        position: "absolute",
                        width: buildingW * 1.8,
                        height: buildingD * 1.8,
                        left: -buildingW * 0.9,
                        top: -buildingD * 0.9,
                        transform: `rotateX(90deg) translateZ(${-totalH / 2}px)`,
                        background: "repeating-linear-gradient(0deg, #fafafa 0 20px, #f5f5f5 20px 21px), repeating-linear-gradient(90deg, transparent 0 20px, #f0f0f0 20px 21px)",
                        border: "1px solid #ececec",
                      }}
                    />

                    {rendered && Array.from({ length: floors }).map((_, i) => {
                      const yOffset = -totalH / 2 + i * floorH * zoom + (floorH * zoom) / 2;
                      const mat = material === "wood" ? "#c9a37a" : material === "stucco" ? "#f0ebe4" : material === "stone" ? "#c8c4bc" : "#d5d5d5";
                      const dark = material === "wood" ? "#a37f56" : material === "stucco" ? "#d9d2c6" : material === "stone" ? "#a8a49b" : "#b5b5b5";
                      return (
                        <Box key={i} w={buildingW} d={buildingD} h={floorH * zoom} y={yOffset} mat={mat} dark={dark} />
                      );
                    })}

                    {/* Roof */}
                    {rendered && (
                      <div
                        style={{
                          position: "absolute",
                          width: buildingW + 20,
                          height: buildingD + 20,
                          left: -(buildingW + 20) / 2,
                          top: -8,
                          transform: `translateY(${-totalH / 2 - 4}px) rotateX(90deg)`,
                          background: style === "alpine" ? "#3a2e26" : "#222",
                          boxShadow: "0 0 30px rgba(0,0,0,0.15)",
                        }}
                      />
                    )}
                  </div>
                </div>
              )}

              {!generating && !rendered && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400 pointer-events-none">
                  Click "Generate" to render your design
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Box({ w, d, h, y, mat, dark }: { w: number; d: number; h: number; y: number; mat: string; dark: string }) {
  const faces: Array<{ t: string; w: number; h: number; c: string }> = [
    { t: `translateZ(${d / 2}px)`, w, h, c: mat },
    { t: `translateZ(${-d / 2}px) rotateY(180deg)`, w, h, c: dark },
    { t: `translateX(${w / 2}px) rotateY(90deg)`, w: d, h, c: dark },
    { t: `translateX(${-w / 2}px) rotateY(-90deg)`, w: d, h, c: mat },
    { t: `translateY(${-h / 2}px) rotateX(90deg)`, w, h: d, c: "#fff" },
    { t: `translateY(${h / 2}px) rotateX(-90deg)`, w, h: d, c: dark },
  ];
  return (
    <div style={{ position: "absolute", left: -w / 2, top: y - h / 2, width: w, height: h, transformStyle: "preserve-3d" }}>
      {faces.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: f.w,
            height: f.h,
            left: (w - f.w) / 2,
            top: (h - f.h) / 2,
            transform: f.t,
            background: f.c,
            border: "1px solid rgba(0,0,0,0.15)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.05)",
          }}
        />
      ))}
    </div>
  );
}
