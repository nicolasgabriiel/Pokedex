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
     
      console.log(pokemon.stats[0].base_stat)
      
      accumulator += `
      <li class="container-pokemon">
      <div class="statushover">
          <div class="status ${type[0]}">
          <p>BASE STATS</p>
          <div>
          <p> HP: ${pokemon.stats[0].base_stat}</p>
          <p> Attack: ${pokemon.stats[1].base_stat}</p>
          <p> Defense: ${pokemon.stats[2].base_stat}</p>
          <p> Special Attack: ${pokemon.stats[3].base_stat}</p>
          <p> Special Defense: ${pokemon.stats[4].base_stat}</p>
          <p> Speed: ${pokemon.stats[5].base_stat}</p>
          </div>
      </div>
          <a  class="resposta ${pokemon.name}" ><img class="imagem-pokemon" alt"${pokemon.name} src="${pokemon['sprites']['other']['official-artwork']['front_default']}"/></a>
          <p class="numero-pokemon">Nº ${pokemon.id.toString().padStart(3, '0')}</p>
          <p class="nome-pokemon">${pokemon.name}</p>
          <div class="container-tipo">
            <div class="tipo1 ${type[0]}">${type[0]}</div>
            <div class="tipo2 ${type[1]}">${type[1]}</div>

            
          </div> 
      <div>    
      </li>
      
      `
     
     



      return accumulator
    }, '')


    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = lisPokemons

  } )
}

fetchPokemon()


let click = document.querySelectorAll('.resposta')

click.onclick = function a () {
  console.log(click[0])
}















// href="../pagina-individual.html"