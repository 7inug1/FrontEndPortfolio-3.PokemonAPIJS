const catAPIkey = `c2478ccf-da9c-49cb-9abf-8b41796e6f44`;
let url = `https://api.thecatapi.com/v1/images/search?`;
let result = document.getElementById('result');

getCatByID();

function getCatByID(){
  // url + new URLSearchParams 
  // = https://api.thecatapi.com/v1/images/search? + breed_id=beng
  fetch(url + new URLSearchParams({
    breed_id: 'beng' 
  } 
  // , {
  //   credentials: 'include' // ?
  // }
  ), {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': catAPIkey
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .then(data => {
    console.log("data: " + data); // data: [object Object]
    
    let catPictureURL = '';
    let catData = JSON.stringify(data);
    
    JSON.parse(catData, (key, value) => {
      if(key == "url"){
        console.log(value);
        catPictureURL = value;
      }
    });
    result.innerHTML = `<img src="${catPictureURL}" width="480px" height="400px"></img>`; 
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}