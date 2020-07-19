import {ingredientsNeeded} from "../lib/apis"
import {sendNeededIngredients} from "../lib/apis"
import { useState } from "react"


export default function NeededIngredients () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [needed, setNeeded] = useState([])

    function emailIngredients () {
        sendNeededIngredients().then((data) =>
            console.log("[email ingredients] " + data)
        )
    }

    function handleRegen () {
        setHasLoaded(false)
    }

    if(hasLoaded) 
    {
        return(
            <div>
                <button onClick={emailIngredients}> Email Me It!</button> <br/>
                <button onClick={handleRegen}> Regenerate!</button>
                <ul>
                    {needed.map(item => (
                        <li key={item.name}>
                            {item.name}
                        </li>
                    ))}
                </ul>


            </div>
        )
    } else {

        ingredientsNeeded().then(function (data) {
            setNeeded(data)
            setHasLoaded(true)
        })

        return (
                <div>
                    Loading ...
                </div>
            )
    }

}