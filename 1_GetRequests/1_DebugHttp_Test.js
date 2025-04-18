import http from 'k6/http'

export default function()
{
    const res = http.get('https://test-api.k6.io/public/crocodiles/'); // get resonse and store it 
   // console.log(res); // This will output the entire response

    /* We can also add a debug flag which will be way easier 
        1 - run the normal command but add the debug flag first 
        2 - k6 run --http-debug .\DebugHttp_Test.js 
        3 - notice the -http-debug

        the flag is basically --http-debug before calling the script and this will give some good debug information
        when doing this the body will be hidden by default 
        if you want to see the body add : k6 run --http-debug="full" .\DebugHttp_Test.js 
        this will result in the response data being returned 

    */
}