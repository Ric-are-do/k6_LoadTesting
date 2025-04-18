import http from 'k6/http'
import { sleep } from 'k6'

// Setting up Options
export const options = 
{
    stages :[
        // here we are basically scaling a test for long and we wait for the application to fall over 
        {duration : '2h' , target : 100 }, 
    ],   
}

// Default function 
export default function ()
{
    http.get('https://test.k6.io');
 
}
