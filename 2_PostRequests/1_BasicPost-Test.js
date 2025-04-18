import http from 'k6/http'
import { check } from 'k6'


export default function () {
    /*
    Here we create a body that will be a javascript object 
    This object will contain what we want to send 
    */

    const body = JSON.stringify(
    {
        "username": "Student_" + Date.now(0), // adds a time stamp so our user is always unique 
        "password": "password"
    });

    // Params will contain headers 
    const params = {
        headers :
        {
            'Content-Type': 'application/json'
        }
    }

    http.post('https://test-api.k6.io/user/register/', body , params );


}