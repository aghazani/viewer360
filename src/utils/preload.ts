import { elements, fetcher, params } from "../../typings";
import { renderImage } from "./renderImage";

type preloadObjectArg = {
  params: params;
  elements: elements;
  imgs: string[];
  fetcher: fetcher;
};

type preload = ({
  params,
  elements,
  imgs,
  fetcher,
}: preloadObjectArg) => Promise<void>;

export const preload: preload = async ({
  params,
  elements,
  imgs = [],
  fetcher,
}) => {
  for (let i = 0; i < imgs.length; i++) {
    try {
      // fetching an creating a URL from blob
      const img = imgs[i];
      const blob = await fetcher(img);
      const url = URL.createObjectURL(blob);

      params.imgs.push(url);

      params.rotation = i;

      renderImage({ params, elements });
    } catch (e) {}
  }

  // All imgs are fetched
  params.loaded = true;

  // set loaded in data for the main image
  // could be used by css
  elements.$viewImage.dataset.loaded = "true";
};
