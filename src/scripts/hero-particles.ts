import * as THREE from "three";

/**
 * A subtle drifting particle field for the hero. Deliberately low-cost:
 * ~900 points, no post-processing, capped DPR, pauses when offscreen/hidden.
 */
export function initHeroParticles() {
  const canvas = document.getElementById(
    "hero-particles",
  ) as HTMLCanvasElement | null;
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Build the point cloud.
  const COUNT = 900;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Muted terracotta points, soft and small (matches the palette accent).
  const material = new THREE.PointsMaterial({
    color: 0xc8825a,
    size: 0.12,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Pointer parallax (eased).
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
    target.y = (e.clientY / window.innerHeight - 0.5) * 0.6;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  function resize() {
    const w = canvas!.clientWidth || window.innerWidth;
    const h = canvas!.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  // Reveal once the first frame is ready.
  canvas.style.opacity = "1";

  let running = true;
  // Pause when tab hidden or hero scrolled out of view.
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
    current.x += (target.x - current.x) * 0.04;
    current.y += (target.y - current.y) * 0.04;
    points.rotation.y += 0.0008;
    points.rotation.x = current.y * 0.4;
    points.rotation.z = current.x * 0.2;
    renderer.render(scene, camera);
  }
  loop();
}
