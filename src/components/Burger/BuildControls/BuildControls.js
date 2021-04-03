import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label:"Salad",type:"salad"},
    {label:"Bacon",type:"bacon"},
    {label:"Cheese",type:"cheese"},
    {label:"Meat",type:"meat"}
]

const buildControls = props =>{
    return (
        <div className = {classes.BuildControls}>
            <p>Current Price: <strong> {props.price} </strong></p>
            {controls.map((ctrl) =>(
                <BuildControl 
                key={ctrl.label} label = {ctrl.label} 
                removed = {props.ingredientRemoved.bind(this,ctrl.type)}
                disabled = {props.disabledInfo[ctrl.type]}
                added ={props.ingredientAdded.bind(this,ctrl.type)}/>
            ))}
            <button className = {classes.OrderButton} disabled = {!props.purchase} onClick = {props.purchasing.bind(this)}>ORDER NOW</button>
        </div>
    );
}
export default buildControls;