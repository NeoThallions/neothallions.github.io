// Créer un formulaire pour taper les todos
// ajouter sur le DOM ce qui est tapé dans l'input à la validation du formulaire
// monInput.value
// supprimer un todo lorsque l'on clique dessus(.remove())
// stocker dans le local Storage la liste
// consulter le local Storage au lancement de l'application pour rajouter les todos

// Récupérer la liste qui est stockée dans le local Storage, s'il y en a une : On prend le contenu de 'todoList' qui est stocké dans le 'localStorage' et on le place dans l'UL dont l'ID est list (list.innerHTML)
function getList() {
    if (window.localStorage.todoList) {
        list.innerHTML = window.localStorage.todoList;
    } else {
        list.innerHTML = `<li> Ajoute une chose à faire</li>`;
    }
}
getList();

// On crée une fonction 'storeList', (on appellera ce contenu 'todoList' C'est le nom qui sera affiché dans le localStorage: inspecter -> Application -> Local storage) qui stocke le contenu de l'ul: 'list.innerHTML' dans le localStorage.
function storeList() {
    window.localStorage.todoList = list.innerHTML;
}

/* Prendre le contenu du formulaire quand il est validé et le stocker dans une variable:            */
/* 1- On pointe le formulaire: */
const form = document.querySelector("form");

/* 2- on ajoute un évènement  à la validation (submit) sur le formulaire. 
Par défaut, la page se réinitialise lorsqu'on la valide, afin d'éviter ça, on utilise (e) et la commande e.preventDefault 
Pour récupérer le contenu d'une balise on utilise l'(id +.textContent)
Pour récupérer le contenu d'un formulaire on utilise l'(id +.value) c'est notre cas.
*/

// Créer l'élément

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(wish.value);
    /* Injecter le contenu d'une variable dans un élément du DOM, ici dans l'UL (id=list):  */
    list.innerHTML += ` <li> ${wish.value}</li> `;
    wish.value = "";

    storeList();
});

// supprimer l'élément:

/*  on crée un évènement au clic sur l'ul et on désigne la cible à supprimer grace à e.target    */
list.addEventListener("click", (e) => {
    /*  contains: méthode qui permet de savoir si la classe existe
    Si la classe 'checked' existe on la supprime, 
    sinon, on la crée.
    */
    if (e.target.classList.contains("checked")) {
        e.target.remove();
    } else {
        e.target.classList.toggle("checked");
    }
    storeList();
});
