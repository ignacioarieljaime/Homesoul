import React from 'react'

const SwitchButton = () => {
  return (
    <label class="switchSmall m5">
      <input type="checkbox" onChange={(e)=>{
        console.log(e.target.checked)
      }}/>
      <small></small>
    </label>

  )
}

export default SwitchButton