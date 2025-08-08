import { Handle, type HandleProps } from '@xyflow/react'
import React from 'react'

const CustomHandle = (props: HandleProps) => {
  return (
    <>
        <Handle 
            style={{
                width: 8,
                height: 8, 
                background: props.type === 'target' ? 'white' : 'blue',
                border: '2px solid black'
            }}
            {...props}
        />
    </>
  )
}

export default CustomHandle