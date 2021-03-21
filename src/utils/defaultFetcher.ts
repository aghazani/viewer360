import { fetcher } from "../../typings";

export const defaultFetcher: fetcher = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();

  return blob;
};
