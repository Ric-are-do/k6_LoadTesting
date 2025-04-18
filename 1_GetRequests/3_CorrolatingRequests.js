import http from 'k6/http'
import { check } from 'k6'


/*
Corralating request means that we run one requst
Take the resultof that request and pass it into another request and then assert the result 
We do this so that we dont hard code values and tha ttesting remains dynamic 

Test site : https://test-api.k6.io/
*/

export default function()
{
   // 1 lets get the resonse 
   const res =  http.get('https://test-api.k6.io/public/crocodiles/');

   // lets now convert the body of the response 
   let crocadileList = res.json();
   console.log ('array item 0 object  is : ' + crocadileList[1].name ); // just check that we are getting back a valie 
   let crocId = crocadileList[0].id; // Store the value of the Id for the first property that we get 
   let crocname = crocadileList[0].name


   // Second request
    const singleCrocadile =  http.get(`https://test-api.k6.io/public/crocodiles/${crocId}/`);  // notice we are using ( ` ) and note ( ' ) for string intrapolation

    check(singleCrocadile ,{
       'Response is 200' : (r) => singleCrocadile.status === 200,
         'Response has croc name '  : (r) => singleCrocadile.json().name === crocname 
         
    } );
}