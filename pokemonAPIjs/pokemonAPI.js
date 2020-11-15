// -------------------------------------------------------------
// New

// <variables>
let resultDiv = document.getElementById('resultDiv');


let pokemonButton;
let pokemonArray = [];
let htmlString = '';
let pokemonName;
let pokemonURL;
let info = [];

// <function calls>
createPokemonButtons();
// getPokemonAttributes();

// <functions>


function createPokemonButtons(){
  fetch(`https://pokeapi.co/api/v2/pokemon/`)
  .then(response => response.json())
  .then(data => {
    // console.log("data: "+ data);
    // console.log("data.results: " + data.results);
    // console.log("Object.keys(data.results): " + Object.keys(data.results));
    // console.log("data.results.url: " + data.results.url)
    pokemonArray = data.results;
    console.log("pokemonArray: " + pokemonArray);
    
    for(let i = 0; i < pokemonArray.length; i++){
      pokemonButton = document.createElement("button");
      pokemonButton.textContent = pokemonArray[i].name;
      pokemonButton.addEventListener('click', function() {
        // getPokemonSprites(pokemonArray[i].url)
        getPokemonAttributes(pokemonArray[i].url)
      }, false);
      let br = document.createElement('br');

      resultDiv.appendChild(pokemonButton);
      resultDiv.appendChild(br);
    }
  })
}

function getPokemonAttributes(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("url: " + url);
    info = data;
    console.log("info: " + data);
    console.log("info.sprites: " + data.sprites);
    // console.log("info.sprites.back_default: " + data.sprites.front_default);
    let img = document.createElement('img');
    img.src = data.sprites.front_default;
    resultDiv.appendChild(img);
  })
}

