import React from 'react'
import './todoinput.css'

/----------------------------------------------------------------/
export const Todoinput = ({HandleFetchInput,AddTodo,userInputData}) => {


  return (

    <div className='totdoinput-container'>

        <input type="text" value={userInputData} placeholder='New Todo'onChange={HandleFetchInput}/>
        <button onClick={AddTodo}>ADD TODO</button>

    </div>

  )
  
}
