// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

//*****************  LES VARIABLES  *************
const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const btnSort = document.querySelectorAll(".btnSort");

console.log(btnSort);

// 3 - Passer les données à une variable

let countriesData = [];
let sortMethod = "maxToMin";

async function fetchCountries() {
  await fetch("./dataCountry.txt")
    .then((res) => res.json())
    .then((data) => (countriesData = data));

  console.log(countriesData);
  countriesDisplay();
}

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

function countriesDisplay() {
  countriesContainer.innerHTML = countriesData
    // on filtre (et on appelle ce filtrage 'country') tous les noms des pays qui incluent la valeur de l'input.
    // on crée un évènement à l'input aprés la fonction qui activera le filtre à chaque lettre tapée.
    // comme JS respecte la casse, on met tout ce qui est tapé dans l'input en minuscule grace à la méthode '.toLowerCase()', ainsi que tous les noms des pays. Donc quelque soit la casse utilisée par l'utilisateur, tout sera mis en minuscule et on comparera des choses équivalentes.
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
          <div class="card">
          <img src=${country.flags.svg} alt=" drapeau ${
          country.translations.fra.common
        }">
          <h2>${country.translations.fra.common}</h2>
          <h4>${country.capital}</h4>
          <p>Population: ${country.population.toLocaleString()}</p> 
          </div>
        `
    )
    .join("");
}

// on appelle la fonction fetchCountries quand elle est chargée (load):
window.addEventListener("load", fetchCountries);

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
inputSearch.addEventListener("input", countriesDisplay);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
//    - avant le map, faire un slice jusqu'à la valeur de l'inputRange.
//    - appeler la méthode countriesDisplay lorsque quelque chose est tapé dans l'input.
//    - connecter l'ascensseur horizontal ('#range') avec sa valeur numérique('#rangeValue') à sa droite: On applique un 'textContent' à 'rangeValue' en pointant la valeur de 'inputRange' .
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
