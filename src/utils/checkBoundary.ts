import { elements, params } from "../../typings";

type checkBoundaryObjectArg = {
  params: params;
  elements: elements;
};
type checkBoundary = ({ params, elements }: checkBoundaryObjectArg) => void;

export const checkBoundary: checkBoundary = ({ params, elements }): void => {
  // boundary left
  if (params.pan.x > 0) {
    params.pan.x = 0;
  }

  //boundary top
  if (params.pan.y > 0) {
    params.pan.y = 0;
  }

  //boundary right
  if (params.currentWidth + params.pan.x < params.initialWidth) {
    params.pan.x = params.initialWidth - params.currentWidth;
  }

  //boundary bottom
  if (params.currentHeight + params.pan.y < params.initialHeight) {
    params.pan.y = params.initialHeight - params.currentHeight;
  }

  // change to translate for better performance
  elements.$viewImage.style.top = params.pan.y + "px";
  elements.$viewImage.style.left = params.pan.x + "px";
};
