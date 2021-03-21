import { rotationAction } from "../actions/types";
import { gesture, removeUse, use } from "./types";

export const rotation: gesture = ({ params, elements }): { use: use } => {
  /**
   * handle touch and mouse rotation
   */
  const listenTouchMouse = (func: rotationAction) => {
    const cacheTouch = new Set();

    const startRotation = (e: PointerEvent) => {
      cacheTouch.add(e);
      e.preventDefault();

      const rotating = (ev: PointerEvent) => {
        // arbitrary attenuation value
        const attenuation = e.pointerType === "touch" ? 15 : 10;

        if (cacheTouch.size === 1) {
          // callback function
          func({ params, elements, r: ev.movementX / attenuation });
        }
      };

      elements.$view.addEventListener("pointermove", rotating);

      document.addEventListener(
        "pointerup",
        () => {
          cacheTouch.delete(e);
          elements.$view.removeEventListener("pointermove", rotating);
        },
        { once: true }
      );
    };

    elements.$view.addEventListener("pointerdown", startRotation, true);

    return () => {
      // unbind
      elements.$view.removeEventListener("pointerdown", startRotation, true);
    };
  };

  /**
   * handle mousePad rotation
   */
  const listenMousePad = (func: Function) => {
    const rotating = (e: WheelEvent) => {
      if (!e.ctrlKey) {
        e.preventDefault();
        var delta = e.deltaX;
        delta = delta !== 0 ? delta / Math.abs(delta) : 0;
        func({ params, elements, r: -delta });
      }
    };

    elements.$view.addEventListener("wheel", rotating, true);

    return () => {
      // unbind
      elements.$view.removeEventListener("wheel", rotating, true);
    };
  };

  return {
    use: (func: rotationAction) => {
      const unbindTouchMouse = listenTouchMouse(func);
      const unbindMousePad = listenMousePad(func);

      const removeUse: removeUse = () => {
        // unbind all
        unbindTouchMouse();
        unbindMousePad();
      };

      return removeUse;
    },
  };
};
