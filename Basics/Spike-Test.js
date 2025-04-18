import http from 'k6/http'
import { sleep } from 'k6'

// Setting up Options
export const options = 
{
    stages :[
        {duration : '2s' , target : 40 },  // make the target usually 4x the stress test values NB this end point may not be the best to hit this with 
       // {duration : '20s' , target : 10 },  // Spike means this is not applicable 
        {duration : '4s' , target : 0 }, // This is our ramp down 
    ],   
}

// Default function 
export default function ()
{
    http.get('https://test.k6.io');
 
}
