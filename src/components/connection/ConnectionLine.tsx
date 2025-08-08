import { getSimpleBezierPath, type ConnectionLineComponentProps } from '@xyflow/react'
import React from 'react'

// when you click to make an edge, this is the UI that appears
const ConnectionLine = ({fromX, fromY, toX, toY, connectionStatus}: ConnectionLineComponentProps) => {
    const [d] = getSimpleBezierPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY
    })

    let color = 'black'
    if(connectionStatus === 'valid') color = 'blue'
    if(connectionStatus === 'invalid') color = 'white'
    return (
        <path fill='none' stroke={color} strokeWidth={1.5} d={d}/>
    )
}

export default ConnectionLine