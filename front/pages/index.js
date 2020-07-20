import Head from 'next/head'
import Recipes from '../components/Recipes'
import Schedule from '../components/Schedule'
import NeededIngredients from '../components/NeededIngredients'
import styles from './index.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe Optimizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Schedule/>
      </div>

      <div>
        <NeededIngredients/>
      </div>
      
    </div>
  )
}
