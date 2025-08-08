
import { useState, useCallback } from 'react';
import { ReactFlow, addEdge, type Connection, type Edge, useNodesState, useEdgesState, Background, MiniMap, Controls, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialEdges, initialNodes } from './constants';
import { InputNode } from './components/node/input/InputNode';
import { TextNode } from './components/node/TextNode'
import { CustomEdge } from './components/edge/CustomEdge';
 
const nodeTypes = {
  input: InputNode,
  text: TextNode,
}

const edgeTypes = {
  customEdge: CustomEdge
}
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  // perisists connections made
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({...params, animated: true, type: 'customEdge' }, eds)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        edgeTypes={edgeTypes}
      >
        <Background variant={BackgroundVariant.Lines} gap={10} color='#f1f1f1' id='1'/>
        <Background variant={BackgroundVariant.Lines} gap={100} color='#ccc' id='2'/>
        <MiniMap zoomable pannable />
        <Controls />
      </ReactFlow> 
    </div>
  );
}