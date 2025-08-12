import React from 'react'

type PaneProps = {
    selectedNode?: any
}

const StepOnePane = ({selectedNode}: PaneProps) => {
  return (
    <>
                <h5>Step {selectedNode.data.stepNo}</h5>
                <p>Greeting: {selectedNode.data.data.greeting_type}</p>
                <p>Practice: {selectedNode.data.data.practice_name}</p>
                <p>Duration: {selectedNode.data.data.estimated_duration}</p>
            </>
  )
}

export default StepOnePane