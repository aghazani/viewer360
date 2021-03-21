import { pan } from "./pan";
import { zoomAction } from "./types";

export const zoom: zoomAction = ({
  params,
  elements,
  scale,
  zoomPosition,
  type,
}): void => {
  if (!params.loaded) {
    return;
  }

  params.scale += scale;
  if (
    params.scale < 1.025 ||
    (type === "dblclick" && params.scale > params.scaleMax)
  ) {
    params.scale = 1;
  } else if (params.scale > params.scaleMax) {
    params.scale = params.scaleMax;
  }

  // the point of all this mess
  // is to zoom where touch/mouse is fired
  // (diff/2) => will center the img in the center of the view
  // so we can change 2 by the correct number to move the center to where the zoom is fired

  const newWidth = params.initialWidth * params.scale;
  const newHeight = params.initialHeight * params.scale;

  const diff = {
    x: newWidth - params.currentWidth,
    y: newHeight - params.currentHeight,
  };

  // zoomPositionPercent
  const zoomPositionPercent = {
    x:
      ((zoomPosition.x - elements.$viewImage.getBoundingClientRect().left) *
        100) /
      params.currentWidth,
    y:
      ((zoomPosition.y - elements.$viewImage.getBoundingClientRect().top) *
        100) /
      params.currentHeight,
  };

  params.currentWidth = newWidth;
  params.currentHeight = newHeight;

  elements.$viewImage.style.width = `${newWidth}px`;
  elements.$viewImage.style.height = `${newHeight}px`;

  const x = -diff.x / (100 / zoomPositionPercent.x); // could trigger division by zero but impossible to reproduce
  const y = -diff.y / (100 / zoomPositionPercent.y); // could trigger division by zero but impossible to reproduce

  pan({ params, elements, x, y, forcePan: true });
};
