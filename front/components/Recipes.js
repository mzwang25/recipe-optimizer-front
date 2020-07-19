import {getRecipes} from "../lib/apis"
import { useState } from "react"


export default function Recipes () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [recipes, setRecipes] = useState([])

    function deleteRecipe(id) {
        console.log("deleteing recipe: " + id)
    }

    if(hasLoaded) 
    {
        return(
            <div>
                <ul>
                    {recipes.map(item => (
                        <li key={item.id}>
                            {item.id} || {item.name} || {item.ingredients} || {item.notes} <br/>
                            <button onClick={() => deleteRecipe(item.id)}>
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
                    Not loaded :(
                </div>
            )
    }

}