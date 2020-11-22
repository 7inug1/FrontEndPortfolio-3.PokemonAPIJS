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
// <function calls>
createPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=40&limit=40`);
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

      // When button clicked, call "getPokemonAttributes()" with parameter as the url
      pokemonButton.addEventListener('click', function() {
        getPokemonAttributes(pokemonArray[i].url)
      }, false);

      let br = document.createElement('br');
      pokemonListContainer.appendChild(pokemonButton);
      pokemonListContainer.appendChild(br);


    }
  })
}
//
// function updatePokemonList(){
//   pokemonListContainer.onscroll = checkTheEndOfScroll;
// }
function checkTheEndOfScroll(event){
  let scrollHeight = event.target.scrollHeight;
  let scrollTop = event.target.scrollTop;
  let clientHeight = event.target.clientHeight;
  
  if(scrollHeight - scrollTop === clientHeight){
    console.log("end of scroll");
    createPokemonList(resultNext);
  }
}


function getPokemonAttributes(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let pokemonDetailsContainer = document.getElementById('pokemonDetailsContainer');
    if(pokemonDetailsContainer.hasChildNodes()){
      pokemonDetailsContainer.removeChild(pokemonDetailsContainer.childNodes[0]);  
    }
    
    // pokemonDetailsContainer.removeChild(pokemonDetailsContainer.childNodes[0]);   
    let img = document.createElement('img');
    img.src = data.sprites.front_default;
    pokemonDetailsContainer.appendChild(img);
    // pokemonDetailsContainer = ''
  })
}

