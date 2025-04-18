import http from 'k6/http'
import { sleep, check, group } from 'k6'


// Documentation for System Tags : https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/

// Setting up Options
export const options =
{
    vus: 10,
    duration: '10s',

 
    thresholds: {
           // Defining thresholds for groups 
    /*
    We have to use the tripple collumns :::  for each group we want to check 

    */
        'group_duration{group:::200s response types}': ['p(95)<1000'],
    }


}


// Default function 
export default function () {
    group('200s response types', function () {
        // we used Mocky.io to generate a automatioc response  
        const res1 = http.get('https://run.mocky.io/v3/a6cc6127-98a2-4d39-b04e-418e12a12cab'); // always return 200
        const res2 = http.get('https://run.mocky.io/v3/3afade21-4563-448c-84f6-1b840fc4a60a'); // always retunr a 201 add a delay in the response

        // Assertions 
        check(res1, { 'status is 200': (r) => r.status == 200 });
        check(res2, { 'status is 201': (r) => r.status == 201 });

    })

    group('Error codes0', function () {
        group('400s error codes', function () {
            const reserror1 = http.get('https://run.mocky.io/v3/1ea0158e-99e6-446c-8f86-6d0d314d5a03'); // 400
            const reserror2 = http.get('https://run.mocky.io/v3/f8439c98-8c74-4636-9afa-aeef1e97de40'); // 401

            // Assert 
            check(reserror1, { 'status is 400': (res1) => res1.status === 400 });
            check(reserror2, { 'status is 401': (res2) => res2.status === 401 });
        })

        group('500 error codes', function () {
            const reserror3 = http.get('https://run.mocky.io/v3/298bc84f-29df-4886-b19f-14579894c20e'); // 500

            // Assert
            check(reserror3, { 'status is 500': (res3) => res3.status == 500 });

        })
    })


}
