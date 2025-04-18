import http from 'k6/http'
import { sleep } from 'k6'

// Setting up Options
export const options = 
{
    vus : 1,
    duration :'30s'
}

// Default function 
export default function ()
{
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(1);
    
    // Add a delay in seconds per request 
   // sleep(1)
}
