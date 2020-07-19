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

export async function addRecipe(name, ingredients, notes) {
   let params = `?name=${name}&ingredients=${ingredients}&notes=${notes}`
   let response = await fetch(host + "/add-recipe" + params, requestOptions)
   let data = await response.text()
   return data
}

export async function deleteRecipe(id) {
   let params = `?id=${id}`
   let response = await fetch(host + "/delete-recipe" + params, requestOptions)
   let data = await response.text()
   return data
}

export async function getSchedule() {
   let response = await fetch(host + "/get-schedule", requestOptions)
   let data = await response.json()
   return data
}

export async function addSchedule(recipeId, notes) {
   let params = `?recipe_id=${recipeId}&notes=${notes}`
   let response = await fetch(host + "/add-schedule" + params, requestOptions)
   let data = await response.text()
   return data
}

export async function deleteSchedule(id) {
   let params = `?id=${id}`
   let response = await fetch(host + "/delete-schedule" + params, requestOptions)
   let data = await response.text()
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