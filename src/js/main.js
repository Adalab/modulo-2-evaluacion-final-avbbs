/* eslint-disable indent */
"use strict";

//QUERY SELECTOR
const charactersList = document.querySelector('.js-characters');
const favoritesList = document.querySelector('.js-favorites');
const form = document.querySelector('.js-form');
const inputSearch = document.querySelector('.js-input');

//VARIABLES GLOBALES

let allCharacters = [];

let favorites = [];

//FUNCIONES
function renderArticle(character) {
  return `<article class="article js-article id="${character.char_id}">
  <img class="article__img" src= '${character.img}'/>
  <h3 class="article__title">${character.name}</h3>
  <p class="article__text">${character.status}</p>
</article>`;
}

function renderAllArticles(character) {
  let html = "";
  for (let i = 0; i < character.length; i++) {
    html += renderArticle(character[i]);
  }
  charactersList.innerHTML = html;
  listenerClickArticle();
}

function renderFavoritesArticles(){
let html = "";
for (let i = 0; i < favorites.length; i++) {
    html += renderArticle(favorites[i]);
}
favoritesList.innerHTML = html; 
}

function listenerClickArticle() {
  const allArticles = document.querySelectorAll('.js-article');
  for (const eachArticle of allArticles) {
    eachArticle.addEventListener('click', handleClickCharacters);
  }
}

function handleClickCharacters(event) {
   event.currentTarget.classList.toggle('select-character');

   const selectedArticle = allCharacters.find((characterObject) => characterObject.char_id === event.currentTarget.char_id);

   const articleInFavorites = favorites.findIndex((characterObject) => characterObject.char_id === event.currentTarget.char_id);

   /* if (articleInFavorites === -1) {
        favorites.push(selectedArticle);
    } 
    else{
    favorites.splice(articleInFavorites, 1)

    }*/
  
  
   renderFavoritesArticles();
}

//EVENTOS

/*form.addEventListener('submit', (event) => {
    event.preventDefault();
})

inputSearch.addEventListener('input', () => {
    const userSearch = inputSearch.value.toLowerCase;

    const filterArticle = allCharacters.filter((eachActor) => eachActor.name.toLowerCase.includes(userSearch));

    renderAllArticles(filterArticle);
});*/

//CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA

renderAllArticles(allCharacters);

fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data;
    renderAllArticles(allCharacters);
  });
