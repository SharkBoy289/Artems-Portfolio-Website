import * as THREE from "three";

/**
 * A subtle drifting "constellation" field for the hero. Deliberately low-cost:
 * - ~140 points that slowly drift; nearby points are joined by faint lines.
 * - The cursor gently repels points near it (parallax + life).
 * - Capped DPR, no post-processing, pauses when offscreen/tab hidden.
 *
 * Line count is the expensive part, so the point count is kept low and links
 * are only drawn within a small radius (squared-distance check, no sqrt).
 */
export function initHeroParticles() {
  const canvas = document.getElementById(
    "hero-particles",
  ) as HTMLCanvasElement | null;
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.z = 22;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const ACCENT = 0xc8825a;
  const COUNT = 140;
  const LINK_DIST = 6; // world units; pairs closer than this get a line
  const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
  const SPREAD_X = 46;
  const SPREAD_Y = 30;
  const SPREAD_Z = 18;

  // Point positions + a small per-point velocity for drift, and a "home"
  // rest position each point springs back toward so the field never disperses.
  const positions = new Float32Array(COUNT * 3);
  const velocities = new Float32Array(COUNT * 3);
  const home = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const x = (Math.random() - 0.5) * SPREAD_X;
    const y = (Math.random() - 0.5) * SPREAD_Y;
    const z = (Math.random() - 0.5) * SPREAD_Z;
    positions[i * 3] = home[i * 3] = x;
    positions[i * 3 + 1] = home[i * 3 + 1] = y;
    positions[i * 3 + 2] = home[i * 3 + 2] = z;
    velocities[i * 3] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
  }

  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pointMat = new THREE.PointsMaterial({
    color: ACCENT,
    size: 0.22,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pointGeo, pointMat);
  scene.add(points);

  // Lines: pre-allocate a generous buffer; update the draw range each frame.
  const MAX_LINKS = COUNT * 6;
  const linePositions = new Float32Array(MAX_LINKS * 2 * 3);
  const lineGeo = new THREE.BufferGeometry();
  const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
  linePosAttr.setUsage(THREE.DynamicDrawUsage);
  lineGeo.setAttribute("position", linePosAttr);
  const lineMat = new THREE.LineBasicMaterial({
    color: ACCENT,
    transparent: true,
    opacity: 0.16,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // Pointer state mapped into the field's x/y space. Repels nearby points.
  const pointer = { x: 9999, y: 9999, active: false };
  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width - 0.5) * SPREAD_X;
    pointer.y = -((e.clientY - r.top) / r.height - 0.5) * SPREAD_Y;
    pointer.active = true;
  };
  const onLeave = () => (pointer.active = false);
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerout", onLeave, { passive: true });

  function resize() {
    const w = canvas!.clientWidth || window.innerWidth;
    const h = canvas!.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  canvas.style.opacity = "1";

  let running = true;
  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
    if (running) loop();
  });
  const io = new IntersectionObserver(
    ([entry]) => {
      running = entry.isIntersecting && document.visibilityState === "visible";
      if (running) loop();
    },
    { threshold: 0 },
  );
  io.observe(canvas);

  let raf = 0;
  function loop() {
    if (!running) {
      cancelAnimationFrame(raf);
      return;
    }
    raf = requestAnimationFrame(loop);

    // 1) Integrate drift + spring-home + cursor repel.
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      let x = positions[ix] + velocities[ix];
      let y = positions[ix + 1] + velocities[ix + 1];
      let z = positions[ix + 2] + velocities[ix + 2];

      x += (home[ix] - x) * 0.002;
      y += (home[ix + 1] - y) * 0.002;
      z += (home[ix + 2] - z) * 0.002;

      if (pointer.active) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < 64 && dSq > 0.01) {
          const force = (64 - dSq) / 64;
          x += dx * force * 0.025;
          y += dy * force * 0.025;
        }
      }

      positions[ix] = x;
      positions[ix + 1] = y;
      positions[ix + 2] = z;
    }
    pointGeo.attributes.position.needsUpdate = true;

    // 2) Rebuild links between nearby points (squared distance, no sqrt).
    let li = 0;
    for (let i = 0; i < COUNT; i++) {
      const ax = positions[i * 3];
      const ay = positions[i * 3 + 1];
      const az = positions[i * 3 + 2];
      for (let j = i + 1; j < COUNT; j++) {
        const dx = ax - positions[j * 3];
        const dy = ay - positions[j * 3 + 1];
        const dz = az - positions[j * 3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;
        if (dSq < LINK_DIST_SQ && li < MAX_LINKS) {
          const o = li * 6;
          linePositions[o] = ax;
          linePositions[o + 1] = ay;
          linePositions[o + 2] = az;
          linePositions[o + 3] = positions[j * 3];
          linePositions[o + 4] = positions[j * 3 + 1];
          linePositions[o + 5] = positions[j * 3 + 2];
          li++;
        }
      }
    }
    lineGeo.setDrawRange(0, li * 2);
    linePosAttr.needsUpdate = true;

    // 3) Slow ambient rotation for depth.
    points.rotation.y += 0.0004;
    lines.rotation.y = points.rotation.y;

    renderer.render(scene, camera);
  }
  loop();
}
