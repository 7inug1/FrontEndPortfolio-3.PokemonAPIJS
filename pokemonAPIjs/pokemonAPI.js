// Next goal:
// focus on completion
// -material UI: https://material-ui.com/
// -material UI CDN: https://github.com/mui-org/material-ui/tree/master/examples/cdn
// -chooser on left
// -details on right
// -pagination - infinite scrolling

// <variables>
let pokemonListContainer = document.getElementById('pokemonListContainer');

// let pokemonDetailsContainer = document.getElementById('pokemonDetailsContainer');

let pokemonButton;
let pokemonArray = [];
let resultNext = '';
let br = document.createElement('br');
// <function calls>
createPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`);
// updatePokemonList();

// <functions>
function createPokemonList(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // When scrolling starts from the user
    pokemonListContainer.onscroll = checkTheEndOfScroll;

    pokemonArray = data.results;
    resultNext = data.next;
    for(let i = 0; i < pokemonArray.length; i++){
      pokemonButton = document.createElement("button"); // create button element
      pokemonButton.textContent = pokemonArray[i].name; // put "name" as the button content

      // When button clicked, call "getPokemonSprites()" with parameter as the url
      pokemonButton.addEventListener('click', function() {
        getPokemonSprites(pokemonArray[i].url)
      }, false);


      // let br = document.createElement('br');

      pokemonListContainer.appendChild(pokemonButton);
      pokemonListContainer.appendChild(br);
      


    }
  })
}

function checkTheEndOfScroll(event){
  let scrollHeight = event.target.scrollHeight;
  let scrollTop = event.target.scrollTop;
  let clientHeight = event.target.clientHeight;
  
  if(scrollHeight - scrollTop === clientHeight){
    console.log("end of scroll");
    createPokemonList(resultNext);
  }
}


// getPokemonId(){

// }
// getPokemonName(){

// }
// getPokemonSpecies(){

// }
// getPokemonTypes(){

// }
// getPokemonStats(){

// }
// getPokemonBaseExperience(){

// }
// getPokemonAbilities(){

// }
// getPokemonId()
// getPokemonName()
// getPokemonSpecies()
// getPokemonTypes()
// getPokemonStats()
// getPokemonBaseExperience()
// getPokemonAbilities()

function getPokemonSprites(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let pokemonDetailsContainer = document.getElementById('pokemonDetailsContainer');
    
    // var textnode = document.createTextNode("Water"); 
    // let br = document.createElement('img');
    let pokemonSprite = document.createElement('img');
    let pokemonId;
    let pokemonName;
    let pokemonSpecies;
    let pokemonTypes;
    let pokemonStats;
    let pokemonBaseExperience;
    let pokemonAbilities;
    
    if(pokemonDetailsContainer.hasChildNodes()){
      // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
      while (pokemonDetailsContainer.firstChild) {
        pokemonDetailsContainer.removeChild(pokemonDetailsContainer.lastChild);
      }
    }
    // 0
    // pokemonDetailsContainer.appendChild(br);
    pokemonSprite.src = data.sprites.front_default;
    pokemonDetailsContainer.appendChild(pokemonSprite);
    pokemonSprite.appendChild(br);
    // 1
    // let br = document.createElement('br');
    pokemonDetailsContainer.appendChild(document.createElement("br"));
    pokemonId = document.createTextNode(`ID: ${data.id}`); 
    pokemonDetailsContainer.appendChild(pokemonId);
    
    // 2
    pokemonDetailsContainer.appendChild(document.createElement("br"));
    pokemonName = document.createTextNode(`Name: ${data.name}`); 
    pokemonDetailsContainer.appendChild(pokemonName);
    // // 3
    // pokemonDetailsContainer.appendChild(br);
    // pokemonSpecies = document.createTextNode(`Species: ${data.species.name}`); 
    // pokemonDetailsContainer.appendChild(pokemonSpecies);
    // 4
    // pokemonDetailsContainer.appendChild(document.createElement("br"));
    for(let i = 0; i < data.types.length; i++){
      pokemonTypes = document.createTextNode(`Type: ${data.types[i].type.name}`); 
      pokemonDetailsContainer.appendChild(document.createElement("br"));
      pokemonDetailsContainer.appendChild(pokemonTypes);
    }
    // // 5
    // pokemonDetailsContainer.appendChild(br);
    // for(let i = 0; i < data.stats.length; i++){
    //   pokemonStats = document.createTextNode(`Stats: ${data.stats[i].stat.name}`); 
    //   pokemonDetailsContainer.appendChild(br);
    //   pokemonDetailsContainer.appendChild(pokemonStats);
    // }
    // 6
    pokemonDetailsContainer.appendChild(document.createElement("br"));
    pokemonBaseExperience = document.createTextNode(`Base Experience: ${data.base_experience}`); 
    pokemonDetailsContainer.appendChild(pokemonBaseExperience);
    // 7
    // pokemonDetailsContainer.appendChild(document.createElement("br"));
    for(let i = 0; i < data.abilities.length; i++){
      pokemonAbilities = document.createTextNode(`Ability: ${data.abilities[i].ability.name}`); 
      pokemonDetailsContainer.appendChild(document.createElement("br"));
      pokemonDetailsContainer.appendChild(pokemonAbilities);
    }
  });
}

