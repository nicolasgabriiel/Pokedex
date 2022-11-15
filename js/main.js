getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon  = () => {

  const pokemonPromises = []

  for (let i = 1; i < 906; i++ ){

    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
}

Promise.all(pokemonPromises)
  .then(pokemons => {
   
    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {

      const types = pokemon.types.map(typeInfo => typeInfo.type.name)
      const typesSeparadas = types.join(' ');
      const type = typesSeparadas.split(' ')
     
      accumulator += `
      <li class="container-pokemon">
          <img class="imagem-pokemon" alt"${pokemon.name} src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/>
          <p class="numero-pokemon">Nº ${pokemon.id}</p>
          <p class="nome-pokemon">${pokemon.name}</p>
          <div class="container-tipo">
            <div class="tipo1 ${type[0]}">${type[0]}</div>
            <div class="tipo2 ${type[1]}">${type[1]}</div>
          </div>  
      </li>
      `
      return accumulator
    }, '')


    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = lisPokemons

  } )
}

fetchPokemon()




    
