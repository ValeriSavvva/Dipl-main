import { useState } from "react";

const InputRadio = (props) => {

  const func= (props.valueProp=='label1' || props.valueProp=='label2' || props.valueProp=='label3' )? ()=>{props.funcProp(props.valueProp)}:null

  return (
    <div className="radio-button">
      <input 
        type="radio" 
        name={props.nameProp} 
        value={props.valueProp} 
        onChange={func}/>
      <label className="p-2" for={props.valueProp}>{props.descriptionProp}</label>

      <div className={props.children && props.activeProp==props.valueProp 
												?'element-list-input column-container'
												:'hidden'}>

        {props.children}
      </div>
    </div>
  );
};
export {InputRadio}
