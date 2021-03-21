import { panAction } from "../actions/types";
import { gesture, removeUse, use } from "./types";

export const pan: gesture = ({ params, elements }): { use: use } => {
  const listenTouchMouse = (func: panAction) => {
    const cacheTouch = new Set();

    const startPan = (e: PointerEvent) => {
      let xStart = e.clientX;
      let yStart = e.clientY;
      cacheTouch.add(e);
      e.preventDefault();

      const panning = (ev: PointerEvent) => {
        const x = ev.clientX - xStart;
        const y = ev.clientY - yStart;

        xStart = ev.clientX;
        yStart = ev.clientY;

        if (cacheTouch.size === 1) {
          // callback function
          func({ params, elements, x, y });
        }
      };

      elements.$view.addEventListener("pointermove", panning);

      document.addEventListener(
        "pointerup",
        () => {
          cacheTouch.delete(e);
          elements.$view.removeEventListener("pointermove", panning);
        },
        { once: true }
      );
    };

    elements.$view.addEventListener("pointerdown", startPan, true);

    return () => {
      // unbind
      elements.$view.removeEventListener("pointerdown", startPan, true);
    };
  };

  return {
    use: (func: panAction) => {
      const unbindTouchMouse = listenTouchMouse(func);

      const removeUse: removeUse = () => {
        // unbind all
        unbindTouchMouse();
      };

      return removeUse;
    },
  };
};
