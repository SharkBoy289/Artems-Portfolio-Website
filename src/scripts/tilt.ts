/**
 * Subtle 3D tilt toward the cursor for any [data-tilt] element.
 * - Skipped entirely for touch devices and reduced-motion users.
 * - Pure CSS-variable driven (--rx / --ry); the transform lives in CSS.
 * - Pointer math is cheap and runs only while hovering a card.
 */
const MAX_DEG = 6; // gentle; bigger reads as gimmicky

export function initTilt() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduce || coarse) return;

  const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");
  cards.forEach((card) => {
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", `${px * MAX_DEG * 2}deg`);
      card.style.setProperty("--rx", `${-py * MAX_DEG * 2}deg`);
      card.classList.remove("tilt-reset");
    };
    const onLeave = () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.classList.add("tilt-reset");
    };
    card.addEventListener("pointermove", onMove, { passive: true });
    card.addEventListener("pointerleave", onLeave, { passive: true });
  });
}
