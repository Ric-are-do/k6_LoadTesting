import http from 'k6/http'
import { check } from 'k6'


/*
Corralating request means that we run one requst
Take the resultof that request and pass it into another request and then assert the result 
We do this so that we dont hard code values and tha ttesting remains dynamic 

Test site : https://test-api.k6.io/
*/

export default function () {
   // 1 lets get the resonse 
   const res = http.get('https://test-api.k6.io/public/crocodiles/');

   // This is how we get the headers from the response 
   console.log(res.headers)

   // if you want the valie of the headers , all you need to do is look at te respnse and add the key for the header you want 
   console.log(res.headers.Allow) // This will give the value for the allow header

   /*
      returns the value of the content length header , this will fail becuase this property has a special character in the key 
      int the name of the Key  (ontent - Length )

      To fix this we need to put the name of the property in quotation marks  ( '' ) to make it a string and we replace it with a [] bracke
   */

   console.log(res.headers['Content-Length']) // Will work 
   console.log(res.headers.Content-Length) // wont work 
   




}