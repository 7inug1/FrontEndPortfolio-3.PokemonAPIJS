// -material UI: https://material-ui.com/
// -material UI CDN: https://github.com/mui-org/material-ui/tree/master/examples/cdn

// let pokemonDetailsCardInfo = document.getElementsByClassName('mdl-card__supporting-text')[0];
let pokemonDetailsCardTitle = document.getElementById('pokemonDetailsCardTitle');
let pokemonDetailsCardSprite = document.getElementById('pokemonDetailsCardSprite');
let pokemonDetailsCardInfo = document.getElementById('pokemonDetailsCardInfo');
let pokemonListContainer = document.getElementById('pokemonListContainer');
let pokemonList = document.getElementById('pokemonList');

let pokemonButton;
let circledNumber;
let nextPageResult = '';
let br = document.createElement('br'); // 없으면 작동 안됨
let endOfScroll = false;
let counter;

createPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`);

getPokemonCount();

// getPokemonQuantity(`https://pokeapi.co/api/v2/pokemon`)
// testing();


function getPokemonCount(){
  console.log(getPokemonQuantity(`https://pokeapi.co/api/v2/pokemon`))
}

function getPokemonQuantity(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    counter = document.createTextNode(" 1/" + data.count);
    counter.className = "counter";

    pokemonList.appendChild(counter);
    console.log(counter);
    console.log(typeof data.count)
    // return data.count;
    // console.log(data.count)
  })
}

function testing(){
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`)
  .then(response => response.json())
  .then(data => {
    console.log("data: " + Object.keys(data.results));
  })
}

function createPokemonList(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    pokemonListContainer.onscroll = checkEndOfScroll; // When scrolling starts from the user
    nextPageResult = data.next;
    const pokemonsOfEachPage = data.results; 
    
    
    for(let i = 0; i < pokemonsOfEachPage.length; i++){
      pokemonButton = document.createElement("button"); // create button element
      // circledNumber = document.createTextNode(i+1);
      // circledNumber.className = "badge badge-pill badge-light ml-2";
      // pokemonButton.textContent = (i+1) + " " + pokemonsOfEachPage[i].name; // put "name" as the button content
      pokemonButton.textContent = pokemonsOfEachPage[i].name; // put "name" as the button content
      pokemonButton.className = "pokemonButton"; // change to materialUI button

      pokemonButton.addEventListener('click', function() {
        getPokemonSprites(pokemonsOfEachPage[i].url)
      }, false);
      let br = document.createElement('br');
      pokemonButton.appendChild(br);
      pokemonListContainer.appendChild(pokemonButton);
      pokemonListContainer.appendChild(br);
    }
  })
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
function checkEndOfScroll(event){
  let scrollHeight = event.target.scrollHeight;
  let scrollTop = event.target.scrollTop;
  let clientHeight = event.target.clientHeight;

  if(endOfScroll == false && scrollHeight - scrollTop === clientHeight){
    endOfScroll = true;
    createPokemonList(nextPageResult);
    endOfScroll = false;
    console.log(endOfScroll);
  }
}

function getPokemonSprites(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let pokemonId;
    let pokemonName;
    let pokemonSpecies;
    let pokemonTypes;
    let pokemonStats;
    let pokemonBaseExperience;
    let pokemonAbilities;
    
    if(pokemonDetailsCardInfo.hasChildNodes()){
      // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
      while (pokemonDetailsCardInfo.firstChild) {
        pokemonDetailsCardInfo.removeChild(pokemonDetailsCardInfo.lastChild);
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
  while (pokemonDetailsCardSprite.firstChild) {
    pokemonDetailsCardSprite.removeChild(pokemonDetailsCardSprite.lastChild);
  }
  let pokemonSprite = document.createElement('img');
  pokemonSprite.width = "150"; 
  pokemonSprite.height = "150"; 
  pokemonSprite.src = dataSprites.front_default;
  pokemonDetailsCardSprite.appendChild(pokemonSprite);
  // pokemonSprite.appendChild(br);
}

function getPokemonId(dataId){
  // pokemonDetailsCardInfo.appendChild(document.createElement("br"));
  pokemonId = document.createTextNode(`ID: ${dataId}`); 
  // pokemonDetailsCardInfo.appendChild(document.createElement("br"));
  pokemonDetailsCardInfo.appendChild(pokemonId);
}

function getPokemonName(dataName){
  while (pokemonDetailsCardTitle.firstChild) {
    pokemonDetailsCardTitle.removeChild(pokemonDetailsCardTitle.lastChild);
  }
  console.log("dataName: " + dataName)
  pokemonName = document.createTextNode(dataName); 
  console.log("pokemonName: " + pokemonName)
  pokemonDetailsCardTitle.appendChild(pokemonName);
}

function getPokemonTypes(dataTypes){
  for(let i = 0; i < dataTypes.length; i++){
    pokemonTypes = document.createTextNode(`Type: ${dataTypes[i].type.name}`); 
    pokemonDetailsCardInfo.appendChild(document.createElement("br"));
    pokemonDetailsCardInfo.appendChild(pokemonTypes);
  }
}

function getPokemonBaseExperience(dataBaseExperience){
  // pokemonDetailsCardInfo.appendChild(document.createElement("br"));
  pokemonBaseExperience = document.createTextNode(`Base Experience: ${dataBaseExperience}`); 
  pokemonDetailsCardInfo.appendChild(document.createElement("br"));
  pokemonDetailsCardInfo.appendChild(pokemonBaseExperience);
}

function getPokemonAbilities(dataAbilities){
  for(let i = 0; i < dataAbilities.length; i++){
    pokemonAbilities = document.createTextNode(`Ability: ${dataAbilities[i].ability.name}`); 
    pokemonDetailsCardInfo.appendChild(document.createElement("br"));
    pokemonDetailsCardInfo.appendChild(pokemonAbilities);
  }
}