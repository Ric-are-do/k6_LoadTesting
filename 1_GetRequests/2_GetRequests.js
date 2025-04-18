import http from 'k6/http'
import { check } from 'k6'

// Test site : https://test-api.k6.io/

export default function()
{
   // const ListCrocadile =  http.get('https://test-api.k6.io/public/crocodiles/');

    const singleCrocadile =  http.get('https://test-api.k6.io/public/crocodiles/7');

    // Transform the response to a javascript object -> by transfomring it wit tth thge json() method 
    // 1. console.log(singleCrocadile.json());

    // we can now access the properties of this object
    // singleCrocadile.json().name 

    check(singleCrocadile ,{
       'Response is 200' : (r) => singleCrocadile.status === 200,
         'Response is Sobek ' : (r) => singleCrocadile.json().name === 'Sobek' // notice how we transform the object in the assertion
    } );
}