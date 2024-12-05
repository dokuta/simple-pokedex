// link to actual html page, getting the list id
const pokemonList = document.getElementById('pokemonListId');

// getting the load more button id
const loadMoreButton = document.getElementById('loadMoreButton');

// load more variables
const maxRecords = 151;
const limit = 10;
let offset = 0;

// converting pokémon objects list to pokémon html list and showing them
function loadPokemonItems(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemonItem) => `
            <li class="pokemon-item ${pokemonItem.type}">
                <span class="number">#${pokemonItem.order}</span>
                <span class="name">${pokemonItem.name}</span>

                <div class="details">
                    <ol class="type-list">
                        ${pokemonItem.types.map((type) => `<li class="type-item ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemonItem.picture}"
                        alt="${pokemonItem.name}">
                </div>
            </li>
        `).join('');

        pokemonList.innerHTML += newHtml
    });
}

// default pokémon listing
loadPokemonItems(offset, limit);

// clicking listener, incrementing list
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsNextPage = offset + limit;

    // limiting pokémon quantity
    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        // removing load more button
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});
