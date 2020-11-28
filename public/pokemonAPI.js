// <variables>
let pokemonListContainer = document.getElementById('pokemonListContainer');
let pokemonButton;


let totalPokemonButtonArray = [];
let pokemonDataArray = [];
let resultNext = '';
let br = document.createElement('br');
let endOfScroll = false;

let item1 = document.getElementById('item1');
let randomButton = document.getElementById("randomButton");
randomButton.textContent = "randomButton";
randomButton.addEventListener('click', function() {
  while (pokemonListContainer.hasChildNodes()) {
    pokemonListContainer.removeChild(pokemonListContainer.lastChild);
  }
});

// let offset = 0; //starting point
// let limit = 100;
// <function calls>
createPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`);
// updatePokemonList();
let finalArray = []
// <functions>
function createPokemonList(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // When scrolling starts from the user
    pokemonListContainer.onscroll = checkTheEndOfScroll;
    
    pokemonDataArray = data.results;
    console.log("finalArray: " + finalArray)
    console.log("finalArray.length: " + finalArray.length)
    finalArray.push(data.results)
    console.log("finalArray: " + finalArray)
    console.log("finalArray.length: " + finalArray.length)
    resultNext = data.next;
    let tempPokemonButtonArray = [];
    // while (pokemonListContainer.hasChildNodes()) {
    //   pokemonListContainer.removeChild(pokemonListContainer.lastChild);
    // }

    for(let i = 0; i < pokemonDataArray.length; i++){
      pokemonButton = document.createElement("button"); // create button element
      pokemonButton.textContent = pokemonDataArray[i].name; // put "name" as the button content
      // pokemonButton.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"; // material design button
      pokemonButton.addEventListener('click', function() {getPokemonSprites(pokemonDataArray[i].url)}, false); // get pokemon sprite on button click
      // -----------------------------여기까지 새로운 pokemon list-------------------------------------------------------------------------
      tempPokemonButtonArray.push(pokemonButton);
      console.log(`tempPokemonButtonArray: ${tempPokemonButtonArray[i]}`);
    }

    for(let i = 0; i < tempPokemonButtonArray.length; i++){
      totalPokemonButtonArray.push(tempPokemonButtonArray[i]);
    }
    
    // pokemonListContainer.innerHTML = '';
    for(let i = 0; i < totalPokemonButtonArray.length; i++){
      // console.log(`totalPokemonButtonArray[i]: ${totalPokemonButtonArray[i]}`);
      pokemonListContainer.appendChild(totalPokemonButtonArray[i]);
      pokemonListContainer.appendChild(br);
    }
  })
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
function checkTheEndOfScroll(event){
  let scrollHeight = event.target.scrollHeight;
  let scrollTop = event.target.scrollTop;
  let clientHeight = event.target.clientHeight;
  // console.log("-------------------------------------");
  // console.log("scrollHeight: " + scrollHeight);
  // console.log("scrollTop: " + scrollTop);
  // console.log("scrollHeight - scrollTop: " + (scrollHeight - scrollTop));
  // console.log("clientHeight: " + clientHeight);
  if(endOfScroll == false && scrollHeight - scrollTop === clientHeight){
    while (pokemonListContainer.hasChildNodes()) {
      pokemonListContainer.removeChild(pokemonListContainer.lastChild);
    }
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