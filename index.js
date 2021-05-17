const fs = require('fs')
const http = require('http')
const url = require('url')


//////////////////////////////////////////////////////////////////////
// SERVER

//in order to avoid reading the entire JSON file whenever it is requested, we read it once sunchronously at the begining of the code
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8') //__dirname is the term used to refer to the current folder of the project
    const dataObject = JSON.parse(data); //data in the read function is in string form and so in order to efficintly use  the JSON data in the webapp, we parse the data in the file to a JSON format


// server is created with request and response parameters and assigned to a variable
//a callback function is created to give a respose each time a new request is gotten
const server = http.createServer((req, res) =>{ 
    const pathname = req.url
    
    if(pathname === '/' || pathname === '/overview'){
        res.end('Hello from Overview')
    }else if(pathname === '/products'){
        res.end('Hello from Products')
    }else if(pathname === '/api'){
            res.writeHead(200, {'Content-type' : 'application/json'}) //'aplication/json' is the equivalent of text/html for JSON response types
            res.end(data)
        
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html', //makes the browser expect a html command in the resEnd
            'my-own-header' : 'hello-world'
        })
        res.end('<h1>Page Not Found!</h1>')
    }
    
})

//server is set to listen to the operation on the specified port number and run on the host computer (according to that IP address there)
//then we listen for a new request on the local host and port 8000
//thus the address to search on your browser for this server is 127.0.0.1:8000
server.listen(8000, '127.0.0.1', () => { 
    console.log('Listening to request on port 8000')
})