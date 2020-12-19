// javascript string methods: https://www.w3schools.com/jsref/jsref_obj_string.asp

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

let offset;
let limit;

createPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`);
getPokemonCount();

// getPokemonQuantity(`https://pokeapi.co/api/v2/pokemon`)
// testing();


function getPokemonCount(){
  console.log(getPokemonQuantity(`https://pokeapi.co/api/v2/pokemon?offset=4000&limit=3000`))
}

function getPokemonQuantity(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // counter = document.createTextNode(" 1/" + data.count);
    // counter.className = "counter";

    // pokemonList.appendChild(counter);
    // console.log(counter);
    // console.log(typeof data.count)
    // return data.count;
    // console.log(data.count)
    console.log(url);


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
    
    let offsetRegex = url.search("offset=");
    let limitRegex = url.search("limit=");
    let end = url.indexOf('&')
    let substring = url.substring(Number(offsetRegex+7), url.indexOf('&'));
    offset = Number(substring);
    limit = Number(url.slice((limitRegex+6)));
    
    console.log("offset :" + substring);
    console.log("limit: " + Number(url.slice((limitRegex+6))));

    if(pokemonList.hasChildNodes()){
      // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
      while (pokemonList.firstChild) {
        pokemonList.removeChild(pokemonList.lastChild);
      }
    }

    counter = document.createTextNode("(" + (offset+limit) + "/" + data.count + ")");
    counter.className = "counter";
    pokemonList.appendChild(counter);
    
    for(let i = 0; i < pokemonsOfEachPage.length; i++){
      pokemonButton = document.createElement("button"); // create button element
      // circledNumber = document.createTextNode(i+1);
      // circledNumber.className = "badge badge-pill badge-light ml-2";
      // pokemonButton.textContent = (i+1) + " " + pokemonsOfEachPage[i].name; // put "name" as the button content
      pokemonButton.textContent = pokemonsOfEachPage[i].name; // put "name" as the button content
      pokemonButton.className = "pokemonButton"; // change to materialUI button

      pokemonButton.addEventListener('click', function() {
        getPokemonInformation(pokemonsOfEachPage[i].url)
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

function getPokemonInformation(url){
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
  pokemonSprite.width = "100"; 
  pokemonSprite.height = "100"; 
  if((dataSprites.front_default)!=null){
    pokemonSprite.src = dataSprites.front_default;
  }else{
    pokemonSprite.className = "questionMarkImage";
    pokemonSprite.src = "./question_mark_image.png";
    pokemonSprite.width = '40';
    pokemonSprite.height = '80';
    
    // https://www.pinpng.com/picture/oJhiib_question-mark-bigger-question-mark-pixel-art-hd/
    console.log("null");
  }
  pokemonDetailsCardSprite.appendChild(pokemonSprite);
  // pokemonSprite.appendChild(br);
}

function getPokemonId(dataId){
  // // pokemonDetailsCardInfo.appendChild(pokemonId);

  let strongElement = document.createElement('strong');
  
  // let pokemonIdText = document.getElementById('id'); 
  // strongElement.appendChild(pokemonIdText)
  pokemonId = document.createTextNode(`ID: ${dataId}`); 
  strongElement.appendChild(pokemonId);
  // strongElement.appendChild(pokemonIdText)
  // pokemonDetailsCardInfo.appendChild(document.createElement("br"));
  pokemonDetailsCardInfo.appendChild(strongElement);
  let hr = document.createElement('hr');
  hr.className = "hr";
  pokemonDetailsCardInfo.appendChild(hr);
  // pokemonDetailsCardInfo.appendChild(document.createElement("br"));
}

function getPokemonName(dataName){
  while (pokemonDetailsCardTitle.firstChild) {
    pokemonDetailsCardTitle.removeChild(pokemonDetailsCardTitle.lastChild);
  }
  // console.log("dataName: " + dataName)
  pokemonName = document.createTextNode(dataName); 
  // console.log("pokemonName: " + pokemonName)
  pokemonDetailsCardTitle.appendChild(pokemonName);
}

function getPokemonTypes(dataTypes){
  for(let i = 0; i < dataTypes.length; i++){
    pokemonTypes = document.createTextNode(`Type: ${dataTypes[i].type.name}`); 
    // pokemonDetailsCardInfo.appendChild(document.createElement("br"));
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