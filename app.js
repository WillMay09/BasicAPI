const http = require('http');//allow us to listen and make http requests
const path = require('path');//put file paths together
const fs = require('fs/promises');
const PORT = process.env.PORT;


const server = http.createServer(async (req, res) =>{
    try{
          //routing
          if(req.method === 'GET'){

            //construct filePath
            let filePath;
            switch(req.url){

                case '/':

                filePath = path.join(__dirname, 'public', 'index.html');
                break;
                
                case '/about':

                filePath = path.join(__dirname, 'public', 'about.html');

                break;

            }
            const data = await fs.readFile(filePath)
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);//status code
            res.write(data);
            res.end();


        }else{
            //if method is not GET, right now server only handles get requests
            res.writeHead(405, {'Content-Type' : 'text/html'})
            res.end('<h1>Method not allowed<h1>')
            
        }
   
        
    } catch(error) {
        //server error
        res.writeHead(500, { 'Content-Type': 'text/html'});
        res.end('<h1>Server Error</h1>');


    }
      




});


server.listen(PORT, ()=> {


    console.log('Hello There');



});