import http from 'k6/http'
import { sleep } from 'k6'

// Setting up Options
export const options = 
{
    stages :[
        {duration : '2m' , target : 10 },  // this is our ramp up stage
        {duration : '10m' , target : 10 },   // Generally this will be 8 hour + , we are teesting maingly how the application 
        // will perfom with load for a long period of time, this can result in memory leaks
        // the system can run out of memory and cause the application to crash when its full or run out of space 
        {duration : '2m' , target : 0 }, // This is our ramp down 
    ],   
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
}
