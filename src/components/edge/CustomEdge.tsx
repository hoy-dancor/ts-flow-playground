import { BaseEdge, getSimpleBezierPath, getSmoothStepPath, type EdgeProps } from "@xyflow/react";


export const CustomEdge = ({id, sourceX, sourceY, targetX,targetY, sourcePosition, targetPosition, markerEnd}: EdgeProps) => {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    })

    return (
        <>
            <BaseEdge style={{stroke: '2px solid black'}}id={id} path={edgePath} markerEnd={markerEnd}/>
        </>
    )
}