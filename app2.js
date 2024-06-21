const http = require('http');
const PORT = process.env.PORT || 3000;

const users = [
{id : 1, name: 'John Doe'},
{id: 2, name: 'Jane Doe'},
{id: 3, name: 'Jim Doe'}
];

const server = http.createServer((req, res) =>{

    try{


    
    if(req.method === 'GET' && req.url === '/api/users'){

        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.write(JSON.stringify(users));
        res.end();


    }else{

        res.setHeader({'Content-Type' : 'application/json'});
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'Route not found'}))
        res.end();
    }

    }catch(error){//if an error occurs, error object is automatically thrown
        res.writeHead(500,{'Content-type' : 'text/html'});
        res.write('<h1>Server Error<h1>');
        res.end();


    }


});

server.listen(PORT, () => {

    console.log(`Server is running on ${PORT}`);


});