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

let allCharacters = [];

let favorites = [];

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
}

function renderAllArticles(character) {
  let html = "";
  for (let i = 0; i < character.length; i++) {
    html += renderArticle(character[i]);
  }
  charactersList.innerHTML = html;
  listenerClickArticle();
}

function renderFavoritesArticles() {
  let html = "";
  for (let i = 0; i < favorites.length; i++) {
    html += renderArticle(favorites[i]);
  }
  favoritesList.innerHTML = html;
}

function listenerClickArticle() {
  const allArticles = document.querySelectorAll(".js-article");
  for (const eachArticle of allArticles) {
    eachArticle.addEventListener("click", handleClickCharacters);
  }
}

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
}

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
