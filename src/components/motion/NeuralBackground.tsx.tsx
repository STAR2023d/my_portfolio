import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const GOLD = "214, 178, 110";
const LINK_DIST = 140; // max distance between two connected nodes
const MOUSE_DIST = 190; // how far the cursor "reaches"

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Floating "neural network" background for the Hero.
 * - Nodes drift slowly and connect to nearby nodes.
 * - The cursor connects to nodes around it.
 * - Pauses when off-screen; one still frame if reduced motion is on.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        // node → node links
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${GOLD}, ${(1 - d / LINK_DIST) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // cursor → node links
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(${GOLD}, ${(1 - dm / MOUSE_DIST) * 0.55})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // node dot
        ctx.fillStyle = `rgba(${GOLD}, 0.55)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw();
      if (running) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      raf = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.4,
      }));
      draw();
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Only animate while the Hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(parent);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}
    />
  );
}