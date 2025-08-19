import { Handle, Position, useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import styles from './InputNode.module.css'

export const InputNode = () => {
    const [input, setInput] = useState('')
    const [level, setLevel] = useState('top')
    const {setNodes, getNodes} = useReactFlow()

    const handleClick = () => {
        const nodes = getNodes()
        setNodes((prevNodes) => [
            ...prevNodes, 
            {
                id: `${input}-${nodes.length}`,
                type: 'text',
                position: {
                    x: Math.random() * 100,
                    y: Math.random() * 100
                },
                data: {
                    text: input,
                    level: level
                }
            }
        ])

        setInput('')
    }
 
  return (
    <div className={styles.inputBody}>
    <Handle type="target" position={Position.Top}/>
        <input 
            id="text" 
            name="text" 
            onChange={(e) => setInput(e.target.value)} 
            className="nodrag"
            value={input}
            style={{width: '100%'}}
        />
        <select onChange={(e) => setLevel(e.target.value)}>
          <option value="top">Top Level</option>
          <option value="unit">Unit level</option>
          <option value="end">End level</option>
        </select>
        <button onClick={handleClick} disabled={input.length === 0}>Add</button>
     
      <Handle type="source" position={Position.Bottom}/>
    </div>
  );
}