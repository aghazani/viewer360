import { renderImage } from "../utils";
import { rotationAction } from "./types";

export const rotation: rotationAction = ({ params, elements, r }): void => {
  if (!params.loaded || (params.scale > 1 && params.rotationLockedInZoom)) {
    return;
  }
  params.rotation -= r;
  renderImage({ params, elements });
};
