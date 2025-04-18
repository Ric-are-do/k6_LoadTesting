import http from 'k6/http';
import {check} from 'k6'
import { sleep } from 'k6';
import exec from 'k6/execution'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";

// built in metrics can be found = https://grafana.com/docs/k6/latest/using-k6/metrics/reference/
export const options = 
{
   vus :  10 ,
   duration : '5s',
   thresholds :
      {
         // You can copy the threshold name directly from the report ( will see ticks or x on report)
         http_req_duration : [' p(95) < 500'], // this will conform percentile returned myst be less than 500ms
         http_req_duration : ['max<2000'] ,// sets max duration for a request should be less than 2 seconds 
         http_req_failed : ['rate< 0.3'], // means errors should be less than 1%
         http_reqs : ['count>5'] ,

         // We can also write a rate for the checks patamater which basicaly says how many checks need to pass
         // IE should the minimim pass rate be a specific %
        checks : ['rate>=0.98']



      }

}

export default function () 
{

     //const res = http.get('https://test.k6.io/');


     const res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest == 1 ? 'foo' : '')); // adding an statemnet foo to the end of iteraton one  so that we get one failure in execution
     //console.log(exec.scenario.iterationInTest); // we can check the iteration 
     
     // Assertions 
     check(res,{
        'Satus is 200' : (r) => r.status === 200 ,
        'Page is start page' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')

     });

     // Adding sleep so we dont spam the endpoint
     sleep(2);

}

export function handleSummary(data) {
   return {
     "summary.html": htmlReport(data),
   };
 }