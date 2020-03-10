import 'whatwg-fetch';

// functions in this class that fetches a list
class HttpService {
    //same as var getProducts = function() {}
    //params in ()
    //grab something from a server and on the response printing the json from the server all thanks to the fetch
    getProducts = () => {
        // 1
        var promise = new Promise((resolve, reject) => {
        // 2 
         fetch('http://localhost:3004/product')
        .then(response => {
            // 4
             resolve(response.json());
            })   
        });
        // 3
        return promise
        // immediatly return the promise so a later point in time the promise will be received
    }
}

export default HttpService;