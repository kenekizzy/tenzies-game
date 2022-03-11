import React from "react"

export default function Die(props){
    return (
        <div className="die" style={{backgroundColor: props.isHeld? "lightgreen": "white"}} onClick={props.onClick}>
            <h2>{props.value}</h2>
        </div>
    )
}