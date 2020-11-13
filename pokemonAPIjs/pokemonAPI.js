// -------------------------------------------------------------
// New

// <variables>
let resultDiv = document.getElementById('resultDiv');
let pokemonArray = [];
let htmlString = '';
let pokemonName;
let pokemonURL;
let pokemonButton;

// <function calls>
createPokemonButtons();
// getPokemonAttributes();

// <functions>
function createPokemonButtons(){
  fetch(`https://pokeapi.co/api/v2/pokemon/`)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(pokemon => {
      pokemonButton = document.createElement("button"); // create button element
      pokemonButton.textContent = pokemon.name; // text in button
      
      console.log("pokemonurl: " + pokemon.url);
      pokemonURL = pokemon.url;
      // figure out how to make the onclick work.
      // pokemonButton.onclick = getPokemonAttributes(pokemon.url);
      
      pokemonArray.push(pokemonButton); // push button with pokemon name into the array
    });
    // print out the buttons on the page
    for(let i = 0; i < pokemonArray.length; i++){
      // pokemonArray[i].onclick = getPokemonAttributes(pokemonURL);
      console.log();
      // pokemonArray[i].addEventListener("click", getPokemonAttributes(pokemonURL));
      resultDiv.appendChild(pokemonArray[i]);
    }
  })
}

function getPokemonAttributes(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let stringify = JSON.stringify(data);

    console.log(Object.keys(data));
  })
}



// // -------------------------------------------------------------
// // Before

// // <variables>
// let resultDiv = document.getElementById('resultDiv');
// let pokemonNameArray = [];
// let htmlString = '';
// let pokemonIndex;

// // <function calls>
// getPokemon();
// getPokemonAttributes();

// // <functions>
// function getPokemon(){
//   fetch(`https://pokeapi.co/api/v2/pokemon/`)
//   .then(response => response.json())
//   .then(data => {
//     let stringify = JSON.stringify(data);
//     JSON.parse(stringify, (key, value) => {
//       if(key == "name"){
//         // console.log("key: " + key);
//         console.log("value: " + value);
//         pokemonNameArray.push(value);
//       }
//     });
//     for(let i = 0; i < pokemonNameArray.length; i++){
//       htmlString += `<button>${pokemonNameArray[i]}</button><br><br>`
//     }
//     resultDiv.innerHTML = htmlString;
//   })
// }

// function getPokemonAttributes(){
//   pokemonIndex = 7;
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
//   .then(response => response.json())
//   .then(data => {
//     let stringify = JSON.stringify(data);

//     console.log(Object.keys(data));
//   })
// }






// -------------------------------------------------------------
// After





// //<variables>
// // let url = `https://pokeapi.co/api/v2/pokemon/`;
// let resultDiv = document.getElementById('resultDiv');
// let pokemonArray = [];
// let htmlString = '';

// let pokemon = {};
// let pokemonIndex;
// let pokemonName;
// let pokemonAttributes = [];

// //<function calls>
// getPokemon();
// // getPokemonAttributes();

// // <functions>
// function getPokemon(){
//   fetch(`https://pokeapi.co/api/v2/pokemon/`)
//   .then(response => response.json())
//   .then(data => {
//     let stringify = JSON.stringify(data);
//     let objData = Object.keys(data);

//     // console.log("Object.keys(data): " + objData.resultDivs);
//     JSON.parse(stringify, (key, value) => {
//       // console.log("key: " + key);
      
//       // 1. Get index of each Pokemon
//       if(Number.isInteger(parseInt(key))){
//         pokemonIndex = key;
//         console.log("pokemonIndex: " + pokemonIndex);
//         pokemon["pokemonIndex"] = pokemonIndex;
//       }
//       // 2. Get name of each Pokemon
//       if(key == "name"){
//         pokemonName = value;
//         console.log("pokemonName: " + pokemonName);
//         pokemon["pokemonName"] = pokemonName;
//       }
//       pokemonArray.push(pokemon);
//       console.log(pokemonArray);
//       // console.log("2pokemonIndex: " + pokemonIndex);
//       // console.log("2pokemonName: " + pokemonName);
//     });
    
//     for(let i = 0; i < pokemonArray.length; i++){
//       htmlString += `${pokemonArray[i]}`
//     }
//     resultDiv.innerHTML = Object.keys(htmlString);

//     // for(let i = 0; i < pokemonArray.length; i++){
//     //   htmlString += `<button onclick="getPokemonAttributes()">${pokemonIndex}. ${pokemonArray[i]}</button><br><br>`
//     // }
//     // resultDiv.innerHTML = htmlString;
//   })
// }

// function getPokemonAttributes(){
//   pokemonIndex = 7;
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
//   .then(response => response.json())
//   .then(data => {
//     let stringify = JSON.stringify(data);
    
//     pokemonAttributes.push(Object.keys(data))
//     // resultDiv.innerHTML = pokemonAttributes;
//     for(let i = 0; i < pokemonAttributes.length; i++){
//       resultDiv.innerHTML += `<li>${pokemonAttributes[i]}</li>`
//     }

//   })
// }