import { nanoid } from "nanoid";
import { MarkerType, Position, type Edge, type Node } from "@xyflow/react";
import type { StepNodeProps } from "./types";

const stepsArray: StepNodeProps[] = [
  {
    stepNo: 1,
    action: "voice_greeting",
    component: "voice_layer",
    data: {
      greeting_type: "standard",
      practice_name: "Valley Medical Practice",
      estimated_duration: "2-3 mins"
    }
  }, {
    stepNo: 2,
    action: "intent_recognition",
    component: "ai_processing",
  }
]

export const initialFlow = [
  ...stepsArray
]

export const initialNodes = [
  { id: nanoid(), position: { x: 0, y: 0 }, data: { }, type: 'input' },
  { id: 'step-one', position: { x:0, y: 100}, data: stepsArray[0], type: 'step'},
  { id: 'step-two', position: { x:250, y: 100}, data: stepsArray[1], type: 'step'}
];

export const initialEdges: Edge[] = [
  { id: 'one-two-bridge', source: 'step-one', target: 'step-two', type: 'customEdge', markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#FFC300'
      } }
];

export type TextNodeProps = Node<
  {
    text: string;
    level: string;
  },
  'textNode'
>