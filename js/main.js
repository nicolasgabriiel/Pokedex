loadpk();

function loadpk (){
    console.log("Estou funcionando") 

    let url = 'https://pokeapi.co/api/v2/pokemon/1/'

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        
            let nomes = document.querySelectorAll('.nome-pokemon')
            console.log(nomes[5])
            
            for(let i = 0; 0 < nomes.length; i++){
                nomes[i].innerHTML  = data['name']
            }
            
           


        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        })
}   