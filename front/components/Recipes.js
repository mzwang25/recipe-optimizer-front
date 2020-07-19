import {getRecipes, addRecipe, deleteRecipe} from "../lib/apis"
import { useState } from "react"


export default function Recipes () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [recipes, setRecipes] = useState([])

    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [notes, setNotes] = useState("")

    function handleDelete(id) {
        console.log("deleteing recipe: " + id)
        deleteRecipe(id).then((data) => {
            setHasLoaded(false)    
        })
    }

    function handleSubmit(event) {
        addRecipe(name, ingredients, notes).then((data) => {
            setHasLoaded(false)
        })

        setName("")
        setIngredients("")
        setNotes("")
        event.preventDefault()
    }

    if(hasLoaded) 
    {
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                    </label> <br/>
                    <label>
                        Ingredients
                        <input type="text" value={ingredients} onChange={(event) => setIngredients(event.target.value)}/>
                    </label><br/>
                    <label>
                        Notes
                        <input type="text" value={notes} onChange={(event) => setNotes(event.target.value)} />
                    </label><br/>
                    <input type="submit"/>

                </form>    
                <ul>
                    {recipes.map(item => (
                        <li key={item.id}>
                            {item.id} || {item.name} || {item.ingredients} || {item.notes} <br/>
                            <button onClick={() => handleDelete(item.id)}>
                                remove
                            </button>
                        </li>
                    ))}
                </ul>


            </div>
        )
    } else {

        getRecipes().then(function (data) {
            setRecipes(data)
            setHasLoaded(true)
        })

        return (
                <div>
                    Loading ...
                </div>
            )
    }

}