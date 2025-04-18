import http from 'k6/http'
import { check } from 'k6'


export default function () {
    /*
    Here we create a body that will be a javascript object 
    This object will contain what we want to send 
    */

    const body = JSON.stringify(
    {
        "username": "1", // adds a time stamp so our user is always unique 
        "password": "1"
    });

    // Params will contain headers 
    const params = {
        headers :
        {
            'Content-Type': 'application/json'
        }
    }

    const res  = http.post('https://test-api.k6.io/auth/token/login/', body , params );

    // Store token into variable 
    let refresh =  res.json().refresh
    let access =  res.json().access

    console.log(refresh);
    console.log(access);



}