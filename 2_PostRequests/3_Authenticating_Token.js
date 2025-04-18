import http from 'k6/http'
import { check } from 'k6'


export default function () {
   const credentials = {
      "username": "1", // adds a time stamp so our user is always unique 
      "password": "1"
   };

   
   const accessToken = http.post('https://test-api.k6.io/auth/token/login/',
       JSON.stringify(credentials), 
       {
         headers: {
              'Content-Type': 'application/json'
         }
       });

   let access = accessToken.json().access;



   // Adding the parameters in the request itself

   const res = http.get(
      'https://test-api.k6.io/my/crocodiles/',
      {
         headers: {
            Authorization: 'Bearer ' + access

         }
      }
   )

   console.log(res.json())

}