export type config = {
  scaleMax: number;
  rotationLockedInZoom: boolean;
};

export type options = {
  scaleMax?: number;
  rotationLockedInZoom?: boolean;
};

export type params = {
  scale: number;
  rotation: number;
  loaded: boolean;
  imgs: string[];
  initialWidth: number;
  currentWidth: number;
  initialHeight: number;
  currentHeight: number;
  pan: {
    x: number;
    y: number;
  };
  zoomPosition: {
    x: number;
    y: number;
  };
} & config;

export type elements = {
  $container: HTMLElement;
  $viewImage: HTMLImageElement;
  $view: HTMLDivElement;
};

export type unmount = () => void;

export type viewer360 = ({
  containerId,
  imgs,
  fetcher,
  options,
}: {
  containerId: string;
  imgs: string[];
  fetcher?: fetcher;
  options?: options;
}) => unmount;

export type fetcher = (url: string) => Promise<Blob>;
