const form = document.querySelector("form");
// 1- afficher la date du jour par défaut,

const today = new Date().toISOString().split("T")[0];
start_date.value = today;

// 2- faire en sorte de ne pas pouvoir sélectionner une date antérieure à la date du jour,
start_date.min = today;

// 3- la date de fin, doit être par défaut le jour suivant de la date de début de séjour.

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1); //ajout d'1 jour
//transformation en bon format
const tomorrowNew = tomorrow.toISOString().split("T")[0];
//on passe la date de demain au bon format à l'input 'end_date'
end_date.value = tomorrowNew;
end_date.min = tomorrowNew;

/* si on en reste là, la date de fin ne changera pas en fonction de la date du début puisqu'elle est créée à partir de la date du jour, et non de la date paramétrée en date de début de séjour.
donc, 
    - on crée un évènement au changement de la date de start qui récupèrera la valeur de start_date que l'on placera dans la variable 'day' */

start_date.addEventListener("change", (e) => {
  let day = new Date(start_date.value);
  // let day = new Date(e.target.value); ça fonctionne pareil

  /* Il faut ajouter une structure de contrôle, car dans le cas où la date de fin est paramétrée avant la date de départ, lorsqu'on va paramétrer cette date de départ, la date de fin se mettra automatiquement au jour suivant:*/
  if (end_date.value < start_date.value) {
    //on ajoute 1 jour
    day.setDate(day.getDate() + 1);
    //on passe au bon format
    const dayNew = day.toISOString().split("T")[0];
    // On place la date au bon format dans end_date
    end_date.value = dayNew;
  }
});
/* 
Un problème subsiste quand la date de START est configurée après aujourd'hui, la date de fin peut quand même être paramétrée entre aujourd'hui et la date de start. */
/* On crée un événement au changement de l'input end_date:*/
end_date.addEventListener("change", (e) => {
  totalPrice.textContent = "";
  //On récupère la valeur choisie de end_date
  let day = new Date(e.target.value);
  // si la date de fin est inférieure à la date de début, on limite la recherche au jour  précédent de end_date en paramétrant la date 'day' au jour précédent.
  if (end_date.value < start_date.value) {
    //on retranche 1 jour
    day.setDate(day.getDate() - 1);
    start_date.value = day.toISOString().split("T")[0];
  }
});

//  4- Calcul du nombre de jour (end_date - start_date) lorsqu'on appuie sur 'Validate'
const bookinkCalc = () => {
  let diffTime = Math.abs(
    new Date(start_date.value) - new Date(end_date.value)
  ); // Ceci va nous donner le nombre de millisecondes séparant les deux dates.
  //calcul du nombre de jours avec arrondi au supérieur (Math.ceil)
  let diffDays = Math.ceil(diffTime / (3600000 * 24));
  console.log(diffDays);
  console.log(priceByNight.textContent);

  // On calcule le prix pour ce nombre de jour et on l'injecte dans le DOM, dans le span 'totalPrice'

  totalPrice.textContent = diffDays * priceByNight.textContent;
};

// on appelle la fonction lorsque les dates sont modifiées sinon, rien ne se passe...
start_date.addEventListener("change", bookinkCalc);
end_date.addEventListener("change", bookinkCalc);
bookinkCalc();
