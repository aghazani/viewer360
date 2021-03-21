import { zoomAction } from "../actions/types";
import { gesture, removeUse, use } from "./types";

export const zoom: gesture = ({ params, elements }): { use: use } => {
  /**
   * listen to mousePad zoom
   */
  const listenMousePad = (func: zoomAction) => {
    const zooming = (e: WheelEvent) => {
      e.preventDefault();
      const x = e.clientX;
      const y = e.clientY;

      let scale = 0;

      if (e.ctrlKey) {
        scale = -e.deltaY * 0.01; // 0.01 reduce amount
      } else if (Math.abs(e.deltaX) === 0) {
        scale = e.deltaY > 1 ? 0.3 : -0.3; // 0.3 reduce amount
      }

      func({
        params,
        elements,
        scale,
        zoomPosition: { x, y },
      });
    };

    elements.$view.addEventListener("wheel", zooming, true);

    return () => {
      // unbind
      elements.$view.removeEventListener("wheel", zooming, true);
    };
  };

  /**
   * listen to doubleClick
   */
  const listenDoubleClick = (func: Function) => {
    const zooming = (e: PointerEvent) => {
      e.preventDefault();

      const x = e.clientX;
      const y = e.clientY;

      func({
        params,
        elements,
        scale: 1,
        zoomPosition: { x, y },
        type: "dblclick",
      });
    };

    elements.$view.addEventListener("dblclick", zooming, true);

    return () => {
      // unbind
      elements.$view.removeEventListener("dblclick", zooming, true);
    };
  };

  /**
   * listen to touch
   */
  const listenTouch = (func: Function) => {
    const startPinch = (e: TouchEvent) => {
      e.preventDefault();
      let startDiff: number;

      const pinching = (ev: TouchEvent) => {
        if (ev.touches.length === 2) {
          const x = ev.touches[1].clientX - ev.touches[0].clientX;

          const newDiff = Math.abs(x);
          const scale = startDiff !== undefined ? newDiff - startDiff : 0;
          const attenuation = 0.009;
          startDiff = newDiff;

          func({
            params,
            elements,
            scale: scale * attenuation,
            zoomPosition: {
              x: (ev.touches[1].clientX + ev.touches[0].clientX) / 2,
              y: (ev.touches[1].clientY + ev.touches[0].clientY) / 2,
            },
          });
        }
      };

      elements.$view.addEventListener("touchmove", pinching);

      document.addEventListener(
        "touchend",
        () => {
          elements.$view.removeEventListener("touchmove", pinching);
        },
        { once: true }
      );
    };

    elements.$view.addEventListener("touchstart", startPinch, true);

    return () => {
      // unbind
      elements.$view.removeEventListener("touchstart", startPinch, true);
    };
  };

  return {
    use: (func: zoomAction) => {
      const unbindMousePad = listenMousePad(func);
      const unbindDoubleClick = listenDoubleClick(func);
      const unbindTouch = listenTouch(func);

      const removeUse: removeUse = () => {
        // unbind all
        unbindMousePad();
        unbindDoubleClick();
        unbindTouch();
      };

      return removeUse;
    },
  };
};
