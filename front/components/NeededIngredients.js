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
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




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

    function getUnits(item) {
        if(item.g === 0)
        {
            return (
                <>
                    <li>{item.tbsp.toFixed(4)} tbsp </li>
                    <li>{item.tsp.toFixed(4)} tsp </li>
                    <li>{item.cups.toFixed(4)} cups </li>
                    <li>{item.li.toFixed(4)} li </li>
                    <li>{item.ml.toFixed(4)} ml </li>
                    <li>{item.gal.toFixed(4)} gal </li>
                </>
            )
        }

        else 
        {
            return (
                <>
                    <li>{item.g.toFixed(2)} g </li>
                    <li>{item.oz.toFixed(2)} oz </li>
                </>
            )
        }
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


                        {needed.map(item => (


                            <Accordion key={item.name + String(item.cups)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography varient="h3">
                                        {item.name.toLowerCase()}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        {getUnits(item)}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </Paper>
        )
    } else {

        ingredientsNeeded().then(function (data) {
            setNeeded(data)
            setHasLoaded(true)
            console.log(data)
        })

        return (
                <div>
                    Loading ...
                </div>
            )
    }

}