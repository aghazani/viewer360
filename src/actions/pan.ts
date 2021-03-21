import { panAction } from "./types";
import { checkBoundary } from "../utils";

export const pan: panAction = ({ params, elements, x, y, forcePan }): void => {
  if (
    !forcePan &&
    (!params.loaded || params.scale === 1 || !params.rotationLockedInZoom)
  ) {
    // forcePan is used to bypass this check and do pan in anyway
    // If scale === 1 no pan is needed
    // if rotationLockedInZoom is disabled we ignore pan
    return;
  }

  params.pan.x += x;
  params.pan.y += y;

  // need to check boundary
  // pan must keep 0 gap between container and view in x and y axis
  checkBoundary({ params, elements });
};
