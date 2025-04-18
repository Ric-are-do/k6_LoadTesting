import http from 'k6/http';
import {check} from 'k6'
import { sleep } from 'k6';

export default function () 
{
    // this is a normal request (get)
    // http.get('https://test.k6.io');

    /*
     But if I want to inspect the returned response it must be saved to a variable 
     like see the status code or look at anything inside the response 
     1. Store respuse in a vairable 
     2. when looking in the stored variable you will see different methods you can use
     */

     const res = http.get('https://test.k6.io/');
     console.log(res.status_text) // checks for status 
     

     // Assertions 
     check(res,{
        'Satus is 200' : (r) => r.status === 200 ,

     });

     // Next we going to run a test to check that the page we got returned has certain text on it 
     
     check(res,{
        'Page is start page' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.') == true
     });

     // Adding sleep so we dont spam the endpoint
     sleep(2);

   // Configuring thresholds 
     // Configured thresholds in the options object






}