// import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Label } from 'reactstrap';
import styles from '../Pane.module.css'
import { MarkerType, useReactFlow } from '@xyflow/react';

type PaneProps = {
    selectedNode?: any,
    setIntegrationFlow: Function,
    currentFlow: Array<any>,
    setSelectedNode: Function
}

const StepTwoPane = ({selectedNode, setIntegrationFlow, currentFlow, setSelectedNode}: PaneProps) => {
    const { updateNodeData, setNodes, setEdges } = useReactFlow();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        formik.handleSubmit()
    }

    const validationSchema = Yup.object().shape({
        intent: Yup.string().required('Intent is required')
    }); 

    const formik = useFormik({
        initialValues: {
            intent: 'appointment_booking'
        },
        validationSchema,
        onSubmit: async (values) => {
            const dataToAdd = {
                step: selectedNode.data.stepNo,
                action: selectedNode.data.action,
                data: {
                    recognized_intent: values.intent,
                    confidence_score: 0.95,
                    entities: ['routine_checkup', 'Dr_Johnson', 'next_week']
                }
            }
            const nodeThree = {
                stepNo: 3,
                action: 'patient_lookup',
                component: 'mcp_tools',
                api_call: '/tools/get_patient_demographics'
            }  
            // call the update node method
            currentFlow[1] = dataToAdd
            updateNodeData('step-two', dataToAdd);

            setIntegrationFlow([...currentFlow, nodeThree])

            setNodes((prevNodes) => [
                ...prevNodes, 
                {
                    id: 'step-three',
                    type: 'step',
                    position: {
                        x: 500,
                        y: 100
                    },
                    data: nodeThree                       
                }
            ])

            setEdges((prevEdges) => [
                ...prevEdges,
                { 
                    id: 'two-three-bridge', 
                    source: 'step-two', 
                    target: 'step-three', 
                    type: 'customEdge', 
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                        color: '#FFC300'
                    }}
            ])

            setSelectedNode()
        },
    });
    
  return (
    <>
        <h5>Step {selectedNode.data.stepNo}</h5>
        <p>Action: {selectedNode.data.action}</p>
        <Form onSubmit={handleSubmit}>
            <><Label for='priority'>Priority</Label>
                <select style={{display: "block"}} name="intent" value={formik.values.intent} onChange={formik.handleChange} className={styles.formControl}>
                    <option value='appointment_booking'>Book Appointment</option>
                    <option value='appointment_cancellation'>Cancel Appointment</option>
                    <option value='appointment_reschedule'>Reschedule Appointment</option>
                </select>
            </>
            <>
                <Button color="primary" type="submit">
                    Submit
                </Button>
            </>
        </Form>
        {selectedNode.data.data && <div>
            <p>{selectedNode.data.data.recognized_intent}</p>
            <p>{selectedNode.data.data.confidence_score}</p>
            <p>Entities: {selectedNode.data.data.entities.map((entity: string) => entity)}</p>
        </div>}
    </>
  )
}

export default StepTwoPane