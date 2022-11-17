/* eslint-disable indent */
"use strict";

//QUERY SELECTOR
const charactersList = document.querySelector(".js-characters");
const favoritesList = document.querySelector(".js-favorites");
const form = document.querySelector(".js-form");
const inputSearch = document.querySelector(".js-input");
const btnSearch = document.querySelector(".js-btn");
const btnReset = document.querySelector(".js-reset-btn");

//VARIABLES GLOBALES

let allCharacters = [];//Variable en la que guardo listado de personajes

let favorites = [];//Variable en la que guardo listado de personajes favoritos

//FUNCIONES
function renderArticle(character) {
  const articleInFavorites = favorites.findIndex(
    (characterObject) => characterObject.char_id === character.char_id
  );

  let classFavorite = "";

  if (articleInFavorites === -1) {
    classFavorite = "";
  } else {
    classFavorite = "select-character";
  }

  return `<article class="article js-article ${classFavorite}" id="${character.char_id}">
  <img class="article__img" src= '${character.img}'/>
  <h3 class="article__title">${character.name}</h3>
  <p class="article__text">${character.status}</p>
</article>`;
}//Función para pintar un personaje(con parámetro)
//Variable que guarda método funcional de búsqueda en listado favoritos que devuelve el índice donde se encuentra el personaje buscado dada la condición de que su id coincida
//Variable local vacía
//Condicional: Si en la constante(en la que estoy guardando la comparación por id) no existe elemento, la variable local no guardará valor y si existe elemento, la variable local pondrá la clase de resaltar personaje
//Esta función devuelve artículo del HTML de cada personaje con interpolación de parámetro de esta función y los datos cogidos del API 
function renderAllArticles(character) {
  let html = "";
  for (let i = 0; i < character.length; i++) {
    html += renderArticle(character[i]);
  }
  charactersList.innerHTML = html;
  listenerClickArticle();
}//Función para pintar todo el listado de personajes(con el mismo parámetro de la función anterior)
//Creo variable local vacía
//Realizo bucle para recorrer la longitud del array con el listado de personajes en cada objeto
//Cada vez debe guardar en la variable html la función de pintar ese personaje con ese índice concreto
//Pinto contenido de la variable html en la ul de section-characters del HTML
//Llamo a la función para poner el evento click en cada personaje

function renderFavoritesArticles() {
  let html = "";
  for (let i = 0; i < favorites.length; i++) {
    html += renderArticle(favorites[i]);
  }
  favoritesList.innerHTML = html;
}//Función para pintar todo el listado de personajes favoritos
//Creo variable local vacía
//Realizo bucle para recorrer la longitud del array con el listado de favoritos
//Cada vez debe guardar en la variable html la función de pintar ese personaje con ese índice concreto
//Pinto contenido de la variable html en la ul de section-favorites del HTML

function listenerClickArticle() {
  const allArticles = document.querySelectorAll(".js-article");
  for (const eachArticle of allArticles) {
    eachArticle.addEventListener("click", handleClickCharacters);
  }
}//Función para poner el evento click en cada personaje
//Traigo todos los artículos del listado de personajes
//Realizo bucle para que al recorrer el listado de artículos, en cada uno, añada un evento click

function handleClickCharacters(event) {
  event.currentTarget.classList.toggle("select-character");

  const selectedArticle = allCharacters.find(
    (characterObject) =>
      characterObject.char_id === parseInt(event.currentTarget.id)
  );

  const articleInFavorites = favorites.findIndex(
    (characterObject) =>
      characterObject.char_id === parseInt(event.currentTarget.id)
  );

  if (articleInFavorites === -1) {
    favorites.push(selectedArticle);
    localStorage.setItem("favoritesLocal", JSON.stringify(favorites));
  } else {
    favorites.splice(articleInFavorites, 1);
    localStorage.setItem("favoritesLocal", JSON.stringify(favorites));
  }

  renderFavoritesArticles();
}// Función manejadora:
//Pone/Quita la clase de resaltar 
//Creo variable local en la que guardo el método funcional de búsqueda de cada objeto del listado de personajes cuyo id de la API sea igual que el id del objeto del listado de personajes
//Creo otra variable local en la que guardo el método funcional de búsqueda de cada índice del objeto cuyo id de la API sea igual que el id del objeto del listado de favoritos
//Condicional: Si en la variable donde guardo la búsqueda de cada índice del objeto cuyo id de la API sea igual que el id del objeto del listado de favoritos, no hay nada, entonces agrego elemento al listado de favoritos con la clase de resaltar
//A su vez, guardo en el localstorage, en texto plano, el elemento favorito agregado
//Condicional:

//EVENTOS

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

btnSearch.addEventListener("click", () => {
  const userSearch = inputSearch.value;
  const filterArticle = allCharacters.filter((eachActor) =>
    eachActor.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  renderAllArticles(filterArticle);
});

btnReset.addEventListener("click", (event) => {
  event.preventDefault();
  favoritesList.innerHTML = "";
});

//CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA

renderAllArticles(allCharacters);

fetch("https://breakingbadapi.com/api/characters")
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data;
    renderAllArticles(allCharacters);
  });

const keepFavorites = JSON.parse(localStorage.getItem("favoritesLocal"));

if (keepFavorites !== null) {
  favorites = keepFavorites;
  renderFavoritesArticles();
}
