import {getSchedule, addSchedule, deleteSchedule} from "../lib/apis"
import { useState } from "react"

export default function Schedule () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [schedule, setSchedule] = useState([])

    const [recipeId, setRecipeId] = useState([])
    const [notes, setNotes] = useState([])

    function handleSubmit() {
        addSchedule(recipeId, notes).then((data) => {
            setHasLoaded(false)
        })

        setRecipeId("")
        setNotes("")
        event.preventDefault()
    }

    function handleDelete(id) {
        console.log("deleteing schedule: " + id)
        deleteSchedule(id).then((data) => {
            setHasLoaded(false)    
        })
    }


    if(hasLoaded) 
    {
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Recipe_Id
                        <input type="text" value={recipeId} onChange={(event) => setRecipeId(event.target.value)}/>
                    </label> <br/>
                    <label>
                        Notes
                        <input value={notes} onChange={(event) => setNotes(event.target.value)} type="text"/>
                    </label><br/>
                    <input type="submit"/>
                </form>              
                <ul>
                    {schedule.map(item => (
                        <li key={item.id}>
                            {item.id} || {item.recipe_id} || {item.notes} <br/>
                            <button onClick={() => handleDelete(item.id)}>
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
                    Loading ...
                </div>
            )
    }

}