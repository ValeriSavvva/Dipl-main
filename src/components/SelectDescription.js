import { useState } from "react"

const SelectDescription=(props)=>{
const [selectedOption, setSelectedOption]=useState([]);
return(
    <div className="element-list-input column-container">
                <div className="">{props.descriptionProp}</div>
                <input type="text" list="brow" className="element-input-style" multiple />
                    <datalist id="brow">
                    {props.option.map((elem)=>( <option>{elem.Name}</option>))}
                    </datalist>

              </div>
)
}
export {SelectDescription}