import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import type { TextNodeProps } from "../../constants";
import styles from './Node.module.css'
import CustomHandle from "../CustomHandle";

export const TextNode = ({data, id}: NodeProps<TextNodeProps>) => {
  const {setNodes, getNodes, setEdges, getEdges} = useReactFlow()

  const handleClick = () => {
    const oldNodes = getNodes()
    const oldEdges = getEdges()
    const newNodesArray = oldNodes.filter((node) => {
      return node.id !== id
    })
    const newEdgesArray = oldEdges.filter((edge) => {
      return edge.source !== id && edge.target !== id
    })
   
    setNodes(() => [
                ...newNodesArray 
            ])
    setEdges(() => [
      ...newEdgesArray
    ])  
  }
  return (
    <>
      <div className={styles.textNode}>
        <span>{data.text}</span>
        <span onClick={handleClick} className={styles.delete}>X</span>
      </div>
      {data.level !== "end" && <CustomHandle type="source" position={Position.Right}/>}
      {data.level !== "top" && <CustomHandle type="target" position={Position.Left}/>}
    </>
  );
}