const catAPIkey = `c2478ccf-da9c-49cb-9abf-8b41796e6f44`;
let url = `https://api.thecatapi.com/v1/images/search?`;
// https://thecatapi.com/v1/images?api_key=c2478ccf-da9c-49cb-9abf-8b41796e6f44
let result = document.getElementById('result');

getCatByID();

function getCatByID(){
  fetch(url + new URLSearchParams({
    breed_id: 'beng'
    // bar: 2,
  }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': catAPIkey
    },
  })
  .then(response => response.json())
  .then(data => console.log(data));
    // result.innerHTML = data;
    
}




// function getCatByID(){
//   fetch(url, { qs: { breed_id: 'beng' } },{
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': catAPIkey
//     },
//   })
//   .then(response => response.json())
//   .then(data => console.log(data));
//     // result.innerHTML = data;
// }