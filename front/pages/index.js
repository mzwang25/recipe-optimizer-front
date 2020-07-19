import Head from 'next/head'
import Recipes from '../components/Recipes'
import Schedule from '../components/Schedule'
import NeededIngredients from '../components/NeededIngredients'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Recipe Optimizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1> Recipes (Recipe_Id, Name, Ingredients, Notes): </h1>
      <Recipes/>

      <h1> Schedule (Schedule_Id, Recipe_Id, Notes): </h1>
      <Schedule/>

      <h1> Ingredients Needed</h1>
      <NeededIngredients/>

    </div>
  )
}
