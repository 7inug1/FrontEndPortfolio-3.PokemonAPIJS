// Next goal:
// focus on completion
// -material UI: https://material-ui.com/
// -material UI CDN: https://github.com/mui-org/material-ui/tree/master/examples/cdn
// -chooser on left
// -details on right
// -pagination - infinite scrolling

// <variables>
let pokemonListContainer = document.getElementById('pokemonListContainer');

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
      pokemonButton.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"; 

      pokemonButton.addEventListener('click', function() {
        getPokemonSprites(pokemonArray[i].url)
      }, false);

      pokemonListContainer.appendChild(pokemonButton);
      pokemonListContainer.appendChild(br);
    }
  })
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
function checkTheEndOfScroll(event){
  let scrollHeight = event.target.scrollHeight;
  let scrollTop = event.target.scrollTop;
  let clientHeight = event.target.clientHeight;
  
  if(scrollHeight - scrollTop === clientHeight){
    console.log("end of scroll");
    createPokemonList(resultNext);
  }
}

function getPokemonSprites(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let pokemonDetailsContainer = document.getElementsByClassName('mdl-card__supporting-text')[0];
    let pokemonNameContainer = document.getElementsByClassName('mdl-card__title-text')[0];
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
    // 0 Sprite
    // pokemonDetailsContainer.appendChild(br);
    pokemonSprite.src = data.sprites.front_default;
    pokemonDetailsContainer.appendChild(pokemonSprite);
    pokemonSprite.appendChild(br);

    // 1 Id
    // let br = document.createElement('br');
    pokemonDetailsContainer.appendChild(document.createElement("br"));
    pokemonId = document.createTextNode(`ID: ${data.id}`); 
    pokemonDetailsContainer.appendChild(pokemonId);
    
    // 2 Name
    // pokemonDetailsContainer.appendChild(document.createElement("br"));
    if(pokemonNameContainer.hasChildNodes()){
      // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
      while (pokemonNameContainer.firstChild) {
        pokemonNameContainer.removeChild(pokemonNameContainer.lastChild);
      }
    }
    pokemonName = document.createTextNode(`${data.name}`); 
    pokemonNameContainer.appendChild(pokemonName);

    // // 3 Species
    // pokemonDetailsContainer.appendChild(br);
    // pokemonSpecies = document.createTextNode(`Species: ${data.species.name}`); 
    // pokemonDetailsContainer.appendChild(pokemonSpecies);
    
    // 4 Types
    // pokemonDetailsContainer.appendChild(document.createElement("br"));
    for(let i = 0; i < data.types.length; i++){
      pokemonTypes = document.createTextNode(`Type: ${data.types[i].type.name}`); 
      pokemonDetailsContainer.appendChild(document.createElement("br"));
      pokemonDetailsContainer.appendChild(pokemonTypes);
    }

    // // 5 Stats
    // pokemonDetailsContainer.appendChild(br);
    // for(let i = 0; i < data.stats.length; i++){
    //   pokemonStats = document.createTextNode(`Stats: ${data.stats[i].stat.name}`); 
    //   pokemonDetailsContainer.appendChild(br);
    //   pokemonDetailsContainer.appendChild(pokemonStats);
    // }

    // 6 Base exp
    pokemonDetailsContainer.appendChild(document.createElement("br"));
    pokemonBaseExperience = document.createTextNode(`Base Experience: ${data.base_experience}`); 
    pokemonDetailsContainer.appendChild(pokemonBaseExperience);
    
    // 7 Abilities
    // pokemonDetailsContainer.appendChild(document.createElement("br"));
    for(let i = 0; i < data.abilities.length; i++){
      pokemonAbilities = document.createTextNode(`Ability: ${data.abilities[i].ability.name}`); 
      pokemonDetailsContainer.appendChild(document.createElement("br"));
      pokemonDetailsContainer.appendChild(pokemonAbilities);
    }
  });
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