import { nanoid } from "nanoid";
import { type Edge, type Node } from "@xyflow/react";

export const initialNodes = [
  { id: nanoid(), position: { x: 0, y: 0 }, data: { }, type: 'input' }
];

export const initialEdges: Edge[] = [];

export type TextNodeProps = Node<
  {
    text: string;
    level: string;
  },
  'textNode'
>