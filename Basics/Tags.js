import http from 'k6/http'
import { sleep } from 'k6'


// Documentation for System Tags : https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/

// Setting up Options
export const options = 
{
    // vus : 1,
    // duration :'30s',

    thresholds : 
    {
        http_req_duration : ['p(95) < 1000'],
            // we can use tags inside the thresholds , we give name of the tag 
            'http_req_duration{status:200}' : ['p(95) < 1000'],   // we are configuring the tag here with the 200
            'http_req_duration{status:201}' : ['p(95) < 50'], 
           // 'http_req_duration{status:201}' : 

        }
}

// Default function 
export default function ()
{
    // we used Mocky.io to generate a automatioc response  
    http.get('https://run.mocky.io/v3/a6cc6127-98a2-4d39-b04e-418e12a12cab'); // always return 200
    http.get('https://run.mocky.io/v3/3afade21-4563-448c-84f6-1b840fc4a60a?mocky-delay=0ms'); // always retunr a 201 add a delay in the response

    
    // Add a delay in seconds per request 
   // sleep(1)
}
