import styles from './Pane.module.css'
import StepOnePane from './stepOne/StepOnePane'
import StepTwoPane from './stepTwo/StepTwoPane'


type PaneProps = {
    selectedNode?: any,
    setIntegrationFlow: Function,
    integrationFlow: Array<any>
}

const Pane = ({selectedNode, integrationFlow, setIntegrationFlow}: PaneProps) => {

  return (
    <div className={styles.paneBody}>
        {selectedNode?.type === 'text' && <div>{selectedNode.data.text}</div>}
        {selectedNode?.type === 'step' && <>
            {selectedNode.data.stepNo === 1 && <StepOnePane selectedNode={selectedNode}/>}
            {selectedNode.data.stepNo === 2 && <StepTwoPane selectedNode={selectedNode} currentFlow={integrationFlow} setIntegrationFlow={setIntegrationFlow}/>}
            {/* {selectedNode.data.stepNo === 2 && <StepTwoPane selectedNode={selectedNode} currentFlow={integrationFlow} setIntegrationFlow={setIntegrationFlow}/>} */}
            {selectedNode.data.stepNo === 3 && <p>test</p>}
        </>}
    </div>
  )
}

export default Pane