import Recipes from '../../components/Recipes'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import Head from 'next/head'

export default function home() {
    return (
        <div>
            <Head>
            <meta meta name="viewport" content= "width=device-width, user-scalable=no" /> 

            </Head>
            <Link href='/'>
                <IconButton>
                    <ArrowBackIcon/>
                </IconButton>
            </Link> 

            <Recipes/>
        </div>
    )
}