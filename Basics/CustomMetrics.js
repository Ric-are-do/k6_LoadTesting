import http from 'k6/http';
import {check} from 'k6'
import { sleep } from 'k6';
import exec from 'k6/execution'
import {Counter , Trend} from 'k6/metrics'

// built in metrics can be found = https://grafana.com/docs/k6/latest/using-k6/metrics/reference/

/*
Creating custom metrics 
imoort metrics module  
 1. lets import the counter metric -> import { Counter} from 'k6/metrics'
 2.  Create the object (not in any method) let myCounter = new Couner
 3. in the default function lets use the add method on the counter , in this case we will just add one each time it loops 
      you will now see that specific metric in your report 
 4. You can define a metric for your counter in threshold 

 link : https://www.udemy.com/course/k6-load-testing-performance-testing/learn/lecture/40176024#overview

*/

// custom metric
let myCounter = new Counter('my_counter');
let newPageResponseTrend = new Trend ('NewPage_Response_Trend')

export const options = 
{
   vus :  10 ,
   duration : '5s',
   thresholds :
      {
         // You can copy the threshold name directly from the report ( will see ticks or x on report)
         http_req_duration : [' p(95) < 500'], // this will conform percentile returned myst be less than 500ms
         my_counter : ['count>10'],
         NewPage_Response_Trend : ['p(95) < 300' , 'p(99)< 250'] 

      }

}

export default function () 
{
     const res = http.get('https://test.k6.io/');
     const newsPage = http.get('https://test.k6.io/news.php') // news page we going to use 



     // Custom metric 
     myCounter.add(1); 
     

     // News Page custom metric  request 
     newPageResponseTrend.add(newsPage.timings.duration); // providing this metric for the timing for this specific request, not te normal test.k6.io

     // Assertions 
     check(res,{
        'Satus is 200' : (r) => r.status === 200 ,
        'Page is start page' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')

     });

     // Adding sleep so we dont spam the endpoint
     sleep(2);

}