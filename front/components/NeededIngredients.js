import {ingredientsNeeded} from "../lib/apis"
import {sendNeededIngredients} from "../lib/apis"
import { useState } from "react"
import Paper from '@material-ui/core/Paper'
import style from './neededingredients.module.css'


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
                <Paper>
                    <div className={style.root}>
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
                </Paper>


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