import { elements, params } from "../../typings";
import { panAction, rotationAction, zoomAction } from "../actions/types";

export type removeUse = () => void;

export type use = (func: rotationAction | zoomAction | panAction) => removeUse;

export type gesture = ({
  params,
  elements,
}: {
  params: params;
  elements: elements;
}) => { use: use };
