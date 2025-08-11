
import { useState, useCallback, useRef } from 'react';
import { ReactFlow, addEdge, type Connection, type Edge, useNodesState, useEdgesState, Background, MiniMap, Controls, BackgroundVariant, MarkerType, ConnectionMode, Panel, type OnReconnect, reconnectEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialEdges, initialNodes } from './constants';
import { InputNode } from './components/node/input/InputNode';
import { TextNode } from './components/node/TextNode'
import { CustomEdge } from './components/edge/CustomEdge';
import ConnectionLine from './components/connection/ConnectionLine';
 
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

  const isValidConnection = (connection: Edge | Connection) => {
      const { source, target } = connection
      if(source === target){
        return false
      }
      return true
  }
 
  // perisists connections made
  const onConnect = useCallback(
    // set edges sets the the new array of edges,
    // add edge first argument is the new edge you are adding
    // 
    (params: Edge | Connection) => setEdges((eds) => addEdge({...params, animated: false, type: 'customEdge', markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#FFC300'
            } }, eds)),
    [],
  );

  const [selectedNode, setSelectedNode] = useState<Node | undefined>();

  const onNodeClick = (event: React.MouseEvent<Element>, node: Node) => {
    console.log("Selected node: ", node)
    setSelectedNode(node)
  }

  const onPaneClick = () => {
    setSelectedNode(undefined)
  }

  const edgeReconnectSuccessful = useRef(false)

  const onReconnectStart = () => {
    edgeReconnectSuccessful.current = false;
  };

  const onReconnect: OnReconnect = (oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((prevEdges) => reconnectEdge(oldEdge, newConnection, prevEdges));
  };

  const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges(prevEdges => prevEdges.filter((prevEdge) => prevEdge.id !== edge.id))
    }
  };
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {selectedNode && <div>{selectedNode?.data?.text}</div>}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // connectionMode seemed to cause problems...
        // connectionMode={ConnectionMode.Loose}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        fitView
        edgeTypes={edgeTypes}
        connectionLineComponent={ConnectionLine}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
      >
        <Panel 
          position='top-right'
          style={{
            border: '1px solid black',
            padding: 12,
            borderRadius: 12,
            background: 'white',
            marginRight: 30,
            width: 150
          }}
        >
          <h3>This is the panel</h3>
        </Panel>
        <Background variant={BackgroundVariant.Lines} gap={10} color='#f1f1f1' id='1'/>
        <Background variant={BackgroundVariant.Lines} gap={100} color='#ccc' id='2'/>
        <MiniMap zoomable pannable />
        <Controls />
      </ReactFlow> 
    </div>
  );
}