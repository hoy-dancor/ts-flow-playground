import { type Node } from "@xyflow/react";

// export type StepNodeData = {
//   greeting_type: string;
//   practice_name: string;
//   estimated_duration: string;
// }; 

export type StepNodeProps = Node<
  {
    stepNo: number,
    action: string,
    component: string,
    data?: any
  }
>