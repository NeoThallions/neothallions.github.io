// https://api.blablagues.net/?rub=blagues

// 1 - la première chose à faire losqu'on travaille avec les API, c'est de tester l'url. Pour ce faire, on la copie dans le navigateur.

// 2 - Ensuite on lance un fetch. Auparavant, on crée les variables qui pointeront les endroits où afficher les éléments récupérés par le fetch

// 3 - Lorsque la logique du fetch est fonctionnelle, on la place dans une fonction que l'on nommera ici 'getJoke'.

// 4 - On appelle la fonction getJoke losqu'il y a un évènement au click sur la fenêtre (classe=.app).

const header = document.getElementById("header");
const content = document.getElementById("content");
const app = document.querySelector(".app");
// on vérifie:
// console.log(content, header);

function getJoke() {
    fetch("https://api.blablagues.net/?rub=blagues")
        .then((res) => res.json())
        // comme on veut récupérer 2 données (le header de la blague et le content), on les met entre {}.
        .then((datas) => {
            console.log(datas);
            /*L'info à afficher dans 'content' pour notre exemple, se trouvera parfois dans '.text' et parfois dans '.text_hidden', (soit la réponse s'affiche tout de suite, ou attends un évènement au clic ou autre pour apparaitre)
        Afin de palier ce problème, et d'afficher systématiquement la réponse, on fait un if/else en ternaire (méthode avec ? valeur si vrai : valeur si faux)
        est-ce que 'data.content.text' contient "", si vrai affiche 'data.content.text_hidden': sinon affiche 'data.content.text' */
            header.textContent = datas.data.content.text_head;
            app.addEventListener("click", () => {
                // console.log(datas.data.content);
                content.textContent =
                    datas.data.content.text == ""
                        ? datas.data.content.text_hidden
                        : datas.data.content.text;
            });
        });
}

const nextJoke = document.querySelector(".nextJoke");

nextJoke.addEventListener("click", () => {
    getJoke();
    content.textContent = "";
});
