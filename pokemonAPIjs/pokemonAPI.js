// -------------------------------------------------------------
// Before

// <variables>
let result = document.getElementById('result');
let pokemonNameArray = [];
let htmlString = '';
let pokemonIndex;

// <function calls>
getPokemon();
getPokemonAttributes();

// <functions>
function getPokemon(){
  fetch(`https://pokeapi.co/api/v2/pokemon/`)
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
      htmlString += `<button>${pokemonNameArray[i]}</button><br><br>`
    }
    result.innerHTML = htmlString;
  })
}

function getPokemonAttributes(){
  pokemonIndex = 7;
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
  .then(response => response.json())
  .then(data => {
    let stringify = JSON.stringify(data);

    console.log(Object.keys(data));
  })
}




// -------------------------------------------------------------
// After





// //<variables>
// // let url = `https://pokeapi.co/api/v2/pokemon/`;
// let result = document.getElementById('result');
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

//     // console.log("Object.keys(data): " + objData.results);
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
//     result.innerHTML = Object.keys(htmlString);

//     // for(let i = 0; i < pokemonArray.length; i++){
//     //   htmlString += `<button onclick="getPokemonAttributes()">${pokemonIndex}. ${pokemonArray[i]}</button><br><br>`
//     // }
//     // result.innerHTML = htmlString;
//   })
// }

// function getPokemonAttributes(){
//   pokemonIndex = 7;
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
//   .then(response => response.json())
//   .then(data => {
//     let stringify = JSON.stringify(data);
    
//     pokemonAttributes.push(Object.keys(data))
//     // result.innerHTML = pokemonAttributes;
//     for(let i = 0; i < pokemonAttributes.length; i++){
//       result.innerHTML += `<li>${pokemonAttributes[i]}</li>`
//     }

//   })
// }