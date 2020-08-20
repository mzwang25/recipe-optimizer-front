import {getRecipes, addRecipe, deleteRecipe} from "../lib/apis"
import { useState } from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionActions from '@material-ui/core/AccordionActions';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import styles from "./recipes.module.css"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function Recipes () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [recipes, setRecipes] = useState([])

    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [notes, setNotes] = useState("")

    const [isValidInput, setIsValidInput] = useState(true)

    const [successMsg, setSuccessMsg] = useState(false)
    const [invalidMsg, setInvalidMsg] = useState(false)

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function handleDelete(id) {
        deleteRecipe(id).then((data) => {
            setHasLoaded(false)    
        })
    }

    function handleSubmit(event) {
        addRecipe(name, ingredients, notes).then((data) => {
            setHasLoaded(false)

            // This is def overdone ... As long as first char is '<' it is bad
            if(data === "<div> something bad happened. might be with ingredient's formatting </div>") {
                setInvalidMsg(true)
            } else {
                setName("")
                setIngredients("")
                setNotes("")
            }
            
        })

        event.preventDefault()
    }

    function checkIngredientInput(event) {
        setIngredients(event.target.value)

        if(event.target.value[event.target.value.length - 1] === ',')
        {
            let regex = /(.+\([0-9.]*(p|tbsp|tsp|cups|li|ml|gal|g|oz)\),\s*)*$/

            console.log(event.target.value.match(regex))
            const invalidInput = event.target.value.match(regex)[0].length === 0
            setIsValidInput(!invalidInput)
        }
    }

    function handleCloseMsg() {
        setSuccessMsg(false)
        setInvalidMsg(false)
    }

    function getIngredients(ing) {
        const arr = ing.split(',')
        const out = arr.map(item => (
                <li key={item}> {item} </li>
        ))

        return (
            <>
                <ul>
                    {out}
                </ul>
            </>
        )
    }


    if(hasLoaded) 
    {
        return(
            <div className={styles.root}>
                <Snackbar open={successMsg} autoHideDuration={3000} onClose={handleCloseMsg}>
                    <Alert severity="success">
                        This is a success message!
                    </Alert>
                </Snackbar>

                <Snackbar open={invalidMsg} autoHideDuration={3000} onClose={handleCloseMsg}>
                    <Alert severity="error">
                        Check your inputs :(
                    </Alert>
                </Snackbar>

                <Paper className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <TextField className={styles.input} label="Name" variant='standard' value={name} onChange={(event) => setName(event.target.value)}/>
                        <br/><br/>
                        <TextField className={styles.input} error={!isValidInput} label="Ingredients ex. Yeast(1p), Water(12li), bread(3tsp)," variant='outlined' multiline rows={5} rowsMax={5} value={ingredients} onChange={checkIngredientInput}/>
                        <br/><br/>
                        <TextField className={styles.input} label="Notes" variant='standard' value={notes} onChange={(event) => setNotes(event.target.value)} />
                        <br/><br/>
                        <Button onClick={handleSubmit} variant="contained" style={{width:'100px', height:'25px'}}>
                            Submit
                        </Button>
                    </form>    
                </Paper>

                <br/><br/>

                <div className="recipeItems">
                    {recipes.map(item => (
                        <Accordion key={item.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                {item.name}
                            </AccordionSummary>
                            <AccordionDetails>
                                {getIngredients(item.ingredients)}
                            </AccordionDetails>

                            <AccordionActions>
                                <IconButton color='secondary' onClick={() => handleDelete(item.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </AccordionActions>
                        </Accordion>
                    ))}
                </div>


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