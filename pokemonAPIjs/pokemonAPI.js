let url = `https://pokeapi.co/api/v2/pokemon/`;
let result = document.getElementById('result');
let pokemonNameArray = [];
let htmlString = '';

getPokemon();

function getPokemon(){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let stringify = JSON.stringify(data);
    JSON.parse(stringify, (key, value) => {
      if(key == "name"){
        // console.log("key: " + key);
        console.log("value: " + value);
        
        pokemonNameArray.push(value);
      }
    });
    for(let i = 0; i < pokemonNameArray.length; i++){
      
    }
    result.innerHTML = pokemonNameArray;
  })
}