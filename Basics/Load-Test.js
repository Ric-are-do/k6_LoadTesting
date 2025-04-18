import http from 'k6/http'
import { sleep } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";

// Setting up Options
export const options = 
{
    stages :[
        {duration : '10s' , target : 10 },  // this is our ramp up stage
        {duration : '20s' , target : 10 },  // sthis is our standard load test once ramp up is completed
        {duration : '10s' , target : 0 }, // This is our ramp down 
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


export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }