import { Position, type NodeProps } from '@xyflow/react'
import React from 'react'
import type { StepNodeProps } from '../../../types'
import styles from './StepNode.module.css'
import CustomHandle from '../../CustomHandle'

const StepNode = ({data}: NodeProps<StepNodeProps>) => {
  return (
    <>
      {data.stepNo === 1 && <div className={styles.stepBody}>
        <p>Step: {`${data.stepNo}`}</p>
        <p>Action: {data.action}</p>
        <p>Component: {data.component}</p>
        <CustomHandle type="source" position={Position.Right}/>
      </div>}
      {data.stepNo === 2 && <div className={styles.stepBody}>
        <CustomHandle type="target" position={Position.Left}/>
        <p>Step: {`${data.stepNo}`}</p>
        <p>Action: {data.action}</p>
        <p>Component: {data.component}</p>
        <CustomHandle type="source" position={Position.Right}/>
      </div>}
      {data.stepNo === 3 && <div className={styles.stepBody}>
        <CustomHandle type="target" position={Position.Left}/>
        <p>Step {data.stepNo}</p>
        <p>Action: {data.action}</p>
        <p>Component: {data.component}</p>
        <CustomHandle type="source" position={Position.Right}/>
      </div>}
    </>
  )
}

export default StepNode