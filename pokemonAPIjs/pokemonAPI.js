// let url = `https://pokeapi.co/api/v2/pokemon/`;
let result = document.getElementById('result');
let pokemonNameArray = [];
let htmlString = '';
let pokemonIndex;

// getPokemon();
getPokemonAttributes();

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

    // JSON.parse(stringify, (key, value) => {
      
    //   // if(key == "species" ){
    //     console.log("key: " + key);
    //     // console.log("value: " + JSON.stringify(value));
    //   // }
    // })

  })
}