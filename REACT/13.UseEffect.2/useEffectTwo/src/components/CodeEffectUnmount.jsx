import React from 'react'
import { useState } from 'react'
import Message from './Message';


const CodeEffectUnmount = () => {
    const [visible, setVisible] = useState(false);
  return (
   <>
   {visible && <Message/>}
   <button onClick={() => setVisible(!visible)}>Soy inevitable</button>
   </>
  )
}

export default CodeEffectUnmount