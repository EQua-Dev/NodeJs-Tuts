const fs = require('fs')

// const hello = 'Hello World!';
// console.log(hello);

//read from file //Blocking (Sychronous)
//  const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//  console.log(textIn);

// //write to file //
//  const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written!');

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1.trimEnd()}.txt`, 'utf-8', (err, data2) => {
        console.log(data2)
        fs.readFile('./txt/append.txt', 'utf-8', (err, data) => {
            console.log(data)
        })

        fs.writeFile('./txt/final.txt', `${data1} \n ${data2}`, 'utf-8', err =>{
            console.log("File- final.txt has been written! ")
        })
        
    })
})
console.log('Reading File...')