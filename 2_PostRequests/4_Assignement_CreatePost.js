import http from 'k6/http'
import { check } from 'k6'

export default function () {

   const credentials = {
      "username": "1", // adds a time stamp so our user is always unique 
      "password": "1"
   };

   // Get Auth Token 
   const accessToken = http.post('https://test-api.k6.io/auth/token/login/',
       JSON.stringify(credentials), 
       {
         headers: {
              'Content-Type': 'application/json'
         }
       });

   let access = accessToken.json().access;

   check(accessToken , {'Access token generated' : (r)=> accessToken.status == 200 })

   // post request for new croc
   const newCroc = {
      "name": "PotatoCroc",
      "sex": 'M',
      "date_of_birth": "2023-02-01"
   };

   const res = http.post(
      'https://test-api.k6.io/my/crocodiles/',
      JSON.stringify(newCroc),
      {
         headers: {
           'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access
         }
      }
   );

   // get this newly created crocarile using the ID asscoiated with it
   let id = res.json().id;
   console.log(id);

}