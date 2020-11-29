// Next goal:
// focus on completion
// -material UI: https://material-ui.com/
// -material UI CDN: https://github.com/mui-org/material-ui/tree/master/examples/cdn
// -chooser on left
// -details on right
// -pagination - infinite scrolling
let pokemonDetailsContainer = document.getElementsByClassName('mdl-card__supporting-text')[0];
let pokemonNameContainer = document.getElementsByClassName('mdl-card__title-text')[0];
// let pokemonCardTitle = document.getElementsByClassName('mdl-card__title-text')[0];

// <variables>
let pokemonListContainer = document.getElementById('pokemonListContainer');

let pokemonButton;
let totalPokemonArray = [];
let pokemonArray = [];
let resultNext = '';
let br = document.createElement('br');
let endOfScroll = false;
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
    // totalPokemonArray.push(pokemonArray);
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
  console.log("-------------------------------------");
  console.log("scrollHeight: " + scrollHeight);
  console.log("scrollTop: " + scrollTop);
  console.log("scrollHeight - scrollTop: " + (scrollHeight - scrollTop));
  console.log("clientHeight: " + clientHeight);
  if(endOfScroll == false && scrollHeight - scrollTop === clientHeight){
    endOfScroll = true;
    console.log(endOfScroll);
    // console.log("end of scroll");
    createPokemonList(resultNext);
    endOfScroll = false;
    console.log(endOfScroll);
  }
}

function getPokemonSprites(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    
    // var textnode = document.createTextNode("Water"); 
    // let br = document.createElement('img');
    
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
    
    getPokemonFrontSprites(data.sprites);
    getPokemonId(data.id);
    getPokemonName(data.name);
    getPokemonTypes(data.types);
    getPokemonBaseExperience(data.base_experience);
    getPokemonAbilities(data.abilities);
  });
}

function getPokemonFrontSprites(dataSprites){
  let pokemonSprite = document.createElement('img');
  pokemonSprite.width = "200"; 
  pokemonSprite.height = "200"; 
  pokemonSprite.src = dataSprites.front_default;
  pokemonDetailsContainer.appendChild(pokemonSprite);
  pokemonSprite.appendChild(br);
}

function getPokemonId(dataId){
  pokemonDetailsContainer.appendChild(document.createElement("br"));
  pokemonId = document.createTextNode(`ID: ${dataId}`); 
  pokemonDetailsContainer.appendChild(pokemonId);
}

function getPokemonName(dataName){
  while (pokemonNameContainer.firstChild) {
    pokemonNameContainer.removeChild(pokemonNameContainer.lastChild);
  }
  // pokemonCardTitle.style.backgroundColor = "red";
  pokemonName = document.createTextNode(`${dataName}`); 
  pokemonNameContainer.appendChild(pokemonName);
}

function getPokemonTypes(dataTypes){
  for(let i = 0; i < dataTypes.length; i++){
    pokemonTypes = document.createTextNode(`Type: ${dataTypes[i].type.name}`); 
    pokemonDetailsContainer.appendChild(document.createElement("br"));
    pokemonDetailsContainer.appendChild(pokemonTypes);
  }
}

function getPokemonBaseExperience(dataBaseExperience){
  pokemonDetailsContainer.appendChild(document.createElement("br"));
  pokemonBaseExperience = document.createTextNode(`Base Experience: ${dataBaseExperience}`); 
  pokemonDetailsContainer.appendChild(pokemonBaseExperience);
}

function getPokemonAbilities(dataAbilities){
  for(let i = 0; i < dataAbilities.length; i++){
    pokemonAbilities = document.createTextNode(`Ability: ${dataAbilities[i].ability.name}`); 
    pokemonDetailsContainer.appendChild(document.createElement("br"));
    pokemonDetailsContainer.appendChild(pokemonAbilities);
  }
}