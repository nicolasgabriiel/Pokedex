const fetchPokemon  = () => {
  getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemonPromises = []

  for (let i = 1; i < 151; i++ ){

    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
}

Promise.all(pokemonPromises)
  .then(pokemons => {
   


    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {

      const types = pokemon.types.map(typeInfo => typeInfo.type.name)

      accumulator += `
      <li class="container-pokemon">
          <img class="imagem-pokemon ${types}" alt"${pokemon.name} src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
          <p class="numero-pokemon">${pokemon.id}</p>
          <p class="nome-pokemon">${pokemon.name}</p>
          <div class="tipo-pokemon">${types.join(' | ')}</div>
      </li>
      `
      return accumulator
    }, '')


    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = lisPokemons

  } )
}

fetchPokemon()