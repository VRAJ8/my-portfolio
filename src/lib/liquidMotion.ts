/**
 * Liquid press behaviour for glass controls.
 *
 * Pressing a control makes it swell like a drop of liquid; dragging while
 * pressed pulls it toward the pointer and stretches it along the drag, with
 * a rubber-band limit. Releasing lets CSS spring it back with a little
 * overshoot (see `.lg-press` in index.css). Values are written as CSS custom
 * properties, so React never re-renders for any of this.
 */

const PRESSABLE = '.lg-press, .btn-primary, .btn-glass, .orb';

// Diminishing returns past a few pixels, like pulling on something elastic.
const rubber = (distance: number, limit: number) => Math.sign(distance) * limit * (1 - Math.exp(-Math.abs(distance) / limit));

const props = ['--lq-x', '--lq-y', '--lq-sx', '--lq-sy'];

export const initLiquidMotion = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const onPointerDown = (down: PointerEvent) => {
    if (down.button !== 0) return;
    const node = (down.target as Element | null)?.closest<HTMLElement>(PRESSABLE);
    if (!node) return;

    // Links and images would otherwise start a native drag and cancel the gesture.
    const preventDrag = (e: DragEvent) => e.preventDefault();
    node.addEventListener('dragstart', preventDrag);

    const { width, height } = node.getBoundingClientRect();
    // Small controls swell more than wide ones.
    const swell = 1 + Math.min(0.12, 10 / Math.max(width, height));
    node.classList.add('lq-pressed');
    node.style.setProperty('--lq-sx', String(swell));
    node.style.setProperty('--lq-sy', String(swell));

    const onMove = (move: PointerEvent) => {
      const dx = move.clientX - down.clientX;
      const dy = move.clientY - down.clientY;
      const tx = rubber(dx, 10);
      const ty = rubber(dy, 10);
      // Stretch along the drag and thin out across it, keeping the volume roughly constant.
      const stretchX = rubber(Math.abs(dx), 40) / 40;
      const stretchY = rubber(Math.abs(dy), 40) / 40;
      node.style.setProperty('--lq-x', `${tx}px`);
      node.style.setProperty('--lq-y', `${ty}px`);
      node.style.setProperty('--lq-sx', String(swell + stretchX * 0.14 - stretchY * 0.06));
      node.style.setProperty('--lq-sy', String(swell + stretchY * 0.14 - stretchX * 0.06));
    };

    const onUp = () => {
      node.classList.remove('lq-pressed');
      props.forEach((p) => node.style.removeProperty(p));
      node.removeEventListener('dragstart', preventDrag);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  document.addEventListener('pointerdown', onPointerDown);
  return () => document.removeEventListener('pointerdown', onPointerDown);
};
