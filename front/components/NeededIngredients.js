import {ingredientsNeeded} from "../lib/apis"
import { useState } from "react"

export default function NeededIngredients () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [needed, setNeeded] = useState([])

    if(hasLoaded) 
    {
        return(
            <div>
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
                    Not loaded :(
                </div>
            )
    }

}