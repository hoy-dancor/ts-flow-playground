import { getSimpleBezierPath, type ConnectionLineComponentProps } from '@xyflow/react'
import React from 'react'

const ConnectionLine = ({fromX, fromY, toX, toY}: ConnectionLineComponentProps) => {
    const [d] = getSimpleBezierPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY
    })
  return (
    <path fill='none' stroke='black' strokeWidth={1.5} d={d}/>
  )
}

export default ConnectionLine