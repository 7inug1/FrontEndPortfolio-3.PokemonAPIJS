const catAPIkey = `c2478ccf-da9c-49cb-9abf-8b41796e6f44`;
let url = `https://api.thecatapi.com/v1/images/search?`;
// https://thecatapi.com/v1/images?api_key=c2478ccf-da9c-49cb-9abf-8b41796e6f44
let result = document.getElementById('result');

getCatByID();

function getCatByID(){
  fetch(url + new URLSearchParams({
    breed_id: 'beng'
  } 
  , {
    credentials: 'include'
  })
  , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': catAPIkey
    }
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    let catPictureURL = '';
    let catData = JSON.stringify(data);
    

    JSON.parse(catData, (key, value) => {
      // if (typeof value === 'string') {
      //   console.log("case1");
      //   console.log(value.toUpperCase());
      // }
      // console.log("case2");
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