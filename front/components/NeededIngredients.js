import {ingredientsNeeded} from "../lib/apis"
import {sendNeededIngredients} from "../lib/apis"
import { useState } from "react"
import Paper from '@material-ui/core/Paper'
import style from './neededingredients.module.css'
import IconButton from '@material-ui/core/IconButton'
import EmailIcon from '@material-ui/icons/Email'
import RefreshIcon from '@material-ui/icons/Refresh'
import Typography from '@material-ui/core/Typography'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import Link from 'next/link'



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
                        <IconButton onClick={emailIngredients}>
                            <EmailIcon/>
                        </IconButton>

                        <Link href="/recipes">
                            <IconButton >
                                <RestaurantMenuIcon/>
                            </IconButton>
                        </Link>

                        <IconButton onClick={handleRegen}>
                            <RefreshIcon/>
                        </IconButton>


                        <ul>
                            {needed.map(item => (
                                <li key={item.name}>
                                    <Typography varient="h3">
                                        {item.name.toLowerCase()}
                                    </Typography>
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