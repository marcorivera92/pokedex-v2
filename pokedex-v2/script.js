// General
const pokemonContainer = document.querySelector(".main-section__black");
const pokemonStatsScreen = document.querySelector(".right-box__screen");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonId = document.querySelector(".pokemon__id");
const pokemonImage = document.querySelector(".pokemon");
const pokemonType = document.querySelector(".pokemon__type");

// FETCH Pokemon
let i = 1;
const fetchPokemon = async (i) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

// ----------- Create Pokemon Card -----------
const getPokemon = async (pokemon) => {
  // Loading feature
  pokemonName.innerHTML = "Loading...";
  pokemonId.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = "#" + createId(data.id);
    pokemonType.innerHTML = "Type: " + data.types.map((type) => type.type.name);
    pokemonImage.src = data["sprites"]["other"]["dream_world"]["front_default"];
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Pokemon not found..";
    pokemonId.innerHTML = "";
    pokemonType.innerHTML = "";
  }

  //Assign specific color to each card type
  const colorCard = colors[data.types[0].type.name];
  pokemonContainer.style.background = colorCard;

  // Assign "0" to IDs
  function createId(id) {
    if (!id) return null;
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    }
    return id;
  }
};

// Color palette for each Pokemon type
const colors = {
  electric: "#F7D02C",
  water: "#6390F0",
  ground: "#E2BF65",
  rock: "#B6A136",
  fairy: "#D685AD",
  poison: "#A33EA1",
  bug: "#A6B91A",
  dragon: "#6F35FC",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C22E28",
  normal: "#A8A77A",
  fire: "#EE8130",
  grass: "#7AC74C",
  ghost: "#735797",
  ice: "#96D9D6",
  dark: "#705746",
  steel: "#B7B7CE",
};

// ----------- END Create Pokemon Card -----------

// Button Prev/Next Functionality
const btnNext = document.querySelector(".next-button");
const btnPrev = document.querySelector(".prev-button");

btnPrev.addEventListener("click", () => {
  if (i > 1) {
    i--;
    getPokemon(i);
  }
});

btnNext.addEventListener("click", () => {
  i++;
  getPokemon(i);
});

// Button Power On/Off Screens
const btnPower = document.querySelector(".top_bar__button");

btnPower.addEventListener("click", function () {
  document
    .querySelector(`.right-box__screen`)
    .classList.toggle("pokedex_active");
});

btnPower.addEventListener("click", function () {
  document
    .querySelector(`.main-section__black`)
    .classList.toggle("pokedex_active");
});

// SearchBar
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getPokemon(input.value);
});

// First pokemon on window loading
getPokemon(i);
