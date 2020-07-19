var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

const host = "http://localhost:5000"

export async function getRecipes() {
   let response = await fetch(host + "/get-recipes", requestOptions)
   let data = await response.json()
   return data
}

export async function addRecipe() {
   let response = await fetch(host + "/add-recipe", requestOptions)
   let data = await response.json()
   return data
}

export async function deleteRecipe() {
   let response = await fetch(host + "/delete-recipe", requestOptions)
   let data = await response.json()
   return data
}

export async function getSchedule() {
   let response = await fetch(host + "/get-schedule", requestOptions)
   let data = await response.json()
   return data
}

export async function addSchedule() {
   let response = await fetch(host + "/add-schedule", requestOptions)
   let data = await response.json()
   return data
}

export async function deleteSchedule() {
   let response = await fetch(host + "/delete-schedule", requestOptions)
   let data = await response.json()
   return data
}

export async function recipeSchedule() {
   let response = await fetch(host + "/recipe-schedule", requestOptions)
   let data = await response.json()
   return data
}

export async function ingredientsNeeded() {
   let response = await fetch(host + "/ingredients-needed", requestOptions)
   let data = await response.json()
   return data
}

export async function sendNeededIngredients() {
   let response = await fetch(host + "/send-needed-ingredients", requestOptions)
   let data = await response.text()
   return data
}