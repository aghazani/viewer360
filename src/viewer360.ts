import { params, elements, viewer360, unmount } from "../typings";
import { rotation, zoom, pan } from "./actions";
import config from "./config";
import { gestureRotation, gestureZoom, gesturePan } from "./gestures";
import { preload } from "./utils";
import { buildUI } from "./utils/buildUI";
import { defaultFetcher } from "./utils/defaultFetcher";

import "./viewer360.css";

const viewer360: viewer360 = ({
  containerId,
  imgs,
  options = config,
  fetcher,
}) => {
  if (!fetcher) {
    fetcher = defaultFetcher;
  }

  const elements: elements = {
    $container: null,
    $viewImage: null,
    $view: null,
  };

  const params: params = {
    scale: 1,
    rotation: 0,
    loaded: false,
    imgs: [],
    initialWidth: 0,
    currentWidth: 0,
    initialHeight: 0,
    currentHeight: 0,
    pan: {
      x: 0,
      y: 0,
    },
    zoomPosition: {
      x: 0,
      y: 0,
    },

    ...config,
    ...options,
  };

  // Build UI structure
  buildUI(params, elements, containerId);

  // Preload all images using the fetcher provided
  // Or the fetch fallback
  preload({ params, elements, imgs, fetcher });

  // Register and handle gesture for Rotation, Zoom and Pan
  // use function return a function to remove all listerners related to the action
  const unbindRotation = gestureRotation({ params, elements }).use(rotation);
  const unbindZoom = gestureZoom({ params, elements }).use(zoom);
  const unbindPan = gesturePan({ params, elements }).use(pan);

  const unmount: unmount = () => {
    // clear function

    // unbind events
    unbindRotation();
    unbindZoom();
    unbindPan();

    // clear dom
    elements.$container.innerHTML = "";
  };

  return unmount;
};

export default viewer360;
