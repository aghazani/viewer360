import { params, elements } from "../../typings/index";

export type panAction = ({
  params,
  elements,
  x,
  y,
  forcePan,
}: {
  params: params;
  elements: elements;
  x: number;
  y: number;
  forcePan?: boolean;
}) => void;

export type rotationAction = ({
  params,
  elements,
  r: number,
}: {
  params: params;
  elements: elements;
  r: number;
}) => void;

export type zoomAction = ({
  params,
  elements,
  scale,
  zoomPosition,
  type,
}: {
  params: params;
  elements: elements;
  scale: number;
  zoomPosition: {
    x: number;
    y: number;
  };
  type?: string;
}) => void;
