import {getSchedule, addSchedule, deleteSchedule, getRecipes} from "../lib/apis"
import { useState } from "react"
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Card from '@material-ui/core/Card'
import style from './schedule.module.css'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function Schedule () {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [schedule, setSchedule] = useState([])
    const [recipes, setRecipes] = useState([])

    const [recipeName, setRecipeName] = useState("")
    const [notes, setNotes] = useState("")

    const [successMsg, setSuccessMsg] = useState(false)
    const [invalidMsg, setInvalidMsg] = useState(false)

    function handleSubmit() {
        let id = 0;
        console.log(recipeName)
        name = recipeName.name
        for(var i in recipes) {
            if(recipes[i].name === name) {
                id = recipes[i].id
                break;
            }
        }

        if(id <= 0)
            return;

        addSchedule(id, notes).then((data) => {
            setHasLoaded(false)
        })

        setSuccessMsg(true)
        setRecipeName("")
        setNotes("")
        event.preventDefault()
    }

    function handleDelete(id) {
        console.log("deleteing schedule: " + id)
        deleteSchedule(id).then((data) => {
            setHasLoaded(false)    
        })
    }


    function rid_to_name(recipe_id){
        for(var i in recipes) {
            if(recipes[i].id === recipe_id) {
                return recipes[i].name
            }
        }
        return ""
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    function handleCloseMsg() {
        setSuccessMsg(false)
        setInvalidMsg(false)
    }


    if(hasLoaded) 
    {
        return(
            <div className={style.root}>
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

                <Paper style={{width:'100%'}}>
                    <div className={style.form}>
                        <form onSubmit={handleSubmit}>
                            <Autocomplete 
                                className={style.formInput}
                                options={recipes}
                                getOptionLabel={(option) => option.name}
                                value = {recipeName}
                                onChange={(event, newValue) => setRecipeName(newValue)}
                                renderInput={(params) => <TextField {...params}  label="Recipe Name"/>}
                            />
                            <br/>
                            <TextField className={style.formInput} label="Notes" value={notes} onChange={(event) => setNotes(event.target.value)} type="text"/>
                            <br/>
                            <br/>
                            <Button onClick={handleSubmit} variant="contained" color="defualt"> New Schedule</Button>
                        </form>
                    </div>
                </Paper>

                <br/>

                <div className={style.scheduleList}>
                    {schedule.map(item => (
                        <Card variant="outlined" key={item.id} className={style.scheduleCard}>
                            <Typography variant="h3" className={style.title}>
                                {rid_to_name(item.recipe_id).toLowerCase()}
                            </Typography>

                            <Typography variant="h5" className={style.body}>
                                {item.notes}
                            </Typography>

                            <div className={style.button}>
                                <IconButton color="secondary" onClick={() => handleDelete(item.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </Card>

                    ))}
                </div>

            </div>
        )
    } else {

        getSchedule().then(function (data) {
            setSchedule(data)
            setHasLoaded(true)
        })
        
        getRecipes().then(function (data) {
            setRecipes(data)
        })

        return (
                <div>
                    <Paper style={{width:'100%'}}>
                        <div className={style.form}>
                            <form onSubmit={handleSubmit}>
                                <Autocomplete 
                                    className={style.formInput}
                                    options={recipes}
                                    getOptionLabel={(option) => option.name}
                                    value = {recipeName}
                                    onChange={(event, newValue) => setRecipeName(newValue)}
                                    renderInput={(params) => <TextField {...params}  label="Recipe Name"/>}
                                />
                                <br/>
                                <TextField className={style.formInput} label="Notes" value={notes} onChange={(event) => setNotes(event.target.value)} type="text"/>
                                <br/>
                                <br/>
                                <Button onClick={handleSubmit} variant="contained" color="defualt"> New Schedule</Button>
                            </form>
                        </div>
                    </Paper>
                </div>
            )
    }

}