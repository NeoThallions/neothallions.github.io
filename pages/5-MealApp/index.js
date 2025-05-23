/**********     LES VARIABLES     **************/
const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");

/**********     LES FONCTIONS     **************/

let meals = [];

async function fetchMeals(search) {
  await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search
  ).then((res) => res.json().then((data) => (meals = data.meals)));
  console.log(meals);
}

/* logique d'affichage: */
function mealsDisplay() {
  // Si aucun résultat:
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    // limitation du nombre de réponses à 12:
    meals.length = 12;
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (i = 1; i < 21; i++) {
          /* on interroge la valeur de strIngredient égal à i */
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push("<li>" + ingredient + " - " + measure + "</li>");
          }
        }

        return `
          <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb} alt="photo" ${meal.strMeal}>
            <ul>${ingredients.join("")}</ul>
            <p id="instructions">${meal.strInstructions}</p>
          </li>
          `;
      })
      .join("");
  }
}

/**********     LES EVENEMENTS QUI DECLENCHENT LES FONCTIONS     **************/

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
  console.log(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
