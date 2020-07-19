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
                <form>
                    Recipe_Id:<br/>
                    <input type="text"/><br/>
                    Notes:<br/>
                    <input type="text"/><br/>
                    <input type="submit"/>
                </form>              
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