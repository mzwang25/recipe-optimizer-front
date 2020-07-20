import Recipes from '../../components/Recipes'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'

export default function home() {
    return (
        <div>
            <Link href='/'>
                <IconButton>
                    <ArrowBackIcon/>
                </IconButton>
            </Link> 

            <Recipes/>
        </div>
    )
}