const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 9;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => `
        <li class="pokemon number-${pokemon.number} ${pokemon.type}">
          <span class="number">${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </li>
      `)
      .join('');

    pokemonList.innerHTML += newHtml;

    addClickEventToPokemons(pokemons);
  });
}

function addClickEventToPokemons(pokemons) {
  pokemons.forEach((pokemon) => {
    const pokemonItem = document.querySelector(`.pokemon.number-${pokemon.number}`);
    if (pokemonItem) {
      pokemonItem.addEventListener("click", () => {
        openModal(pokemon);
      });
    }
  });
}

function loadInitialPokemon() {
  loadPokemonItems(offset, limit);
}

mostrarMais.addEventListener('click', () => {
  offset += limit; 
  loadPokemonItems(offset, limit);
});

document.addEventListener("DOMContentLoaded", loadInitialPokemon);
