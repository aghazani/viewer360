import { elements, params } from "../../typings";

type buildUI = (
  params: params,
  elements: elements,
  containerId: string
) => void;

export const buildUI: buildUI = (params, elements, containerId): void => {
  elements.$container = document.getElementById(containerId);
  elements.$viewImage = document.createElement("img");
  elements.$view = document.createElement("div");

  elements.$container.innerHTML = "";
  elements.$viewImage.setAttribute("draggable", "false");
  elements.$view.classList.add("viewer360__scope");

  elements.$view.append(elements.$viewImage);
  elements.$container.append(elements.$view);

  // save initial width and height for scale
  params.initialHeight = elements.$view.getBoundingClientRect().height;
  params.currentHeight = params.initialHeight;
  params.initialWidth = elements.$view.getBoundingClientRect().width;
  params.currentWidth = params.initialWidth;
};
