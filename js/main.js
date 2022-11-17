getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

let numeroPokemons = 21

let morePokemons = document.getElementById('loadMorePoke')
let allPokemons = document.getElementById('loadAll')
 
console.log(allPokemons);

morePokemons.onclick = function verMais(){
  numeroPokemons += 20;
  console.log(numeroPokemons)
  if(numeroPokemons > 906){
    numeroPokemons = 906
    console.log(numeroPokemons)
    morePokemons.style.display = "none";
    allPokemons.style.display = "none";
    fetchPokemon()
  }else{fetchPokemon()}
}
allPokemons.onclick = function verTudo(){
  numeroPokemons = 906
  fetchPokemon()
  allPokemons.style.display = "none";
  morePokemons.style.display = "none";
}







const fetchPokemon  = () => {
  
  const pokemonPromises = []

  for (let i = 1; i < numeroPokemons; i++ ){

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
      <div class="statushover">
          <div class="status ${type[0]}">
          <p class="base-titulo">BASE STATS</p>
          <div>
          <p class="status-individual"> HP: ${pokemon.stats[0].base_stat}</p>
          <p class="status-individual"> Attack: ${pokemon.stats[1].base_stat}</p>
          <p class="status-individual"> Defense: ${pokemon.stats[2].base_stat}</p>
          <p class="status-individual"> Special Attack: ${pokemon.stats[3].base_stat}</p>
          <p class="status-individual"> Special Defense: ${pokemon.stats[4].base_stat}</p>
          <p class="status-individual"> Speed: ${pokemon.stats[5].base_stat}</p>
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
















// href="../pagina-individual.html"