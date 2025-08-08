import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import type { TextNodeProps } from "../../constants";
import styles from './Node.module.css'
import CustomHandle from "../CustomHandle";

export const TextNode = ({data, id}: NodeProps<TextNodeProps>) => {
  const {setNodes, getNodes} = useReactFlow()

  const handleClick = () => {
    const oldNodes = getNodes()
    const newArray = oldNodes.filter((node) => {
      return node.id !== id
    })
    setNodes(() => [
                ...newArray 
            ])    
  }
  return (
    <>
      <div className={styles.textNode}>
        <span>{data.text}</span>
        <button onClick={handleClick}>X</button>
      </div>
      <CustomHandle type="source" position={Position.Right}/>
      {data.level !== "top" && <CustomHandle type="target" position={Position.Left}/>}
    </>
  );
}