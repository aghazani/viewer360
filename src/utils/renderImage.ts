import { elements, params } from "../../typings";

type renderImageObjectArg = { params: params; elements: elements };
type renderImage = ({ params, elements }: renderImageObjectArg) => void;

export const renderImage: renderImage = ({ params, elements }): void => {
  if (params.rotation >= params.imgs.length) {
    params.rotation = 0;
  } else if (params.rotation < 0) {
    params.rotation = params.imgs.length - 1;
  }
  elements.$viewImage.src = params.imgs[Math.trunc(params.rotation)];
};
