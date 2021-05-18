/**
 *Order for importing node_modules
 1. core modules
 2. 3rd party modules 
 3. Local modules

 **/
const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');
// slugify is an npm dependency used to make the [last part of a] url address more readable

const replaceTemplate = require('./modules/replaceTemplate');

//////////////////////////////////////////////////////////////////////
// SERVER

//in order to avoid reading the entire JSON file whenever it is requested, we read it once sunchronously at the begining of the code

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); //__dirname is the term used to refer to the current folder of the project
//the above statement returns the number of JavaScript objects in the JSON file
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const dataObject = JSON.parse(data); //data in the read function is in string form and so in order to efficintly use  the JSON data in the webapp, we parse the data in the file to a JSON format

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// server is created with request and response parameters and assigned to a variable
//a callback function is created to give a respose each time a new request is gotten
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(req.url);
  console.log(pathname);

  //Overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    //in the function, we loop through all objects in the JSON object and fetch the replacement data for each by mapping the html template placeholders to those in the pre-defined function
    const cardHtml = dataObject
      .map((el) => replaceTemplate(templateCard, el))
      .join(''); //JSON data is returned in array format, so we append it to an empty string
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml); //replace the placeholder in the overview template with its data

    res.end(output);

    //Product
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObject[query.id]; //fetch the JSON array position of the selected object(product)
    const output = replaceTemplate(templateProduct, product); //call the function to replace the placeholders in the passed in template (templateProduct in this case)
    // slugs([product])
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' }); //'aplication/json' is the equivalent of text/html for JSON response types
    res.end(data);

    //Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html', //makes the browser expect a html command in the resEnd
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page Not Found!</h1>');
  }
});

//server is set to listen to the operation on the specified port number and run on the host computer (according to that IP address there)
//then we listen for a new request on the local host and port 8000
//thus the address to search on your browser for this server is 127.0.0.1:8000
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
