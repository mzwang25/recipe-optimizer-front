import {getSchedule} from "../lib/apis"
import { useState } from "react"

export default function Schedule () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [schedule, setSchedule] = useState([])

    function deleteSchedule(id) {
        console.log("deleteing schedule: " + id)
    }

    if(hasLoaded) 
    {
        return(
            <div>
                <ul>
                    {schedule.map(item => (
                        <li key={item.id}>
                            {item.id} || {item.recipe_id} || {item.notes} <br/>
                            <button onClick={() => deleteSchedule(item.id)}>
                                remove
                            </button>
                        </li>
                    ))}
                </ul>


            </div>
        )
    } else {

        getSchedule().then(function (data) {
            console.log(data)
            setSchedule(data)
            setHasLoaded(true)
        })

        return (
                <div>
                    Not loaded :(
                </div>
            )
    }

}