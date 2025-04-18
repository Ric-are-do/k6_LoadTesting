import http from 'k6/http'
import { sleep } from 'k6'

// Setting up Options
export const options = 
{
    vus : 10,
    duration :'10s'
}

// Default function 
export default function ()
{
    http.get('https://test.k6.io')
    
    // Add a delay in seconds per request 
   // sleep(1)
}
