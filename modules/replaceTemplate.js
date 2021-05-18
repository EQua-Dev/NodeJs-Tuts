module.exports = 
//now we create a function to perform all the placeholder replacements
(temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName) //we use 'let' and not 'const' because we want to be able to change the value of 'output'
    //here, product is the JSON data file content, we use the '/.../g' to make the change to every (global) placeholder and not just the 1st one encountered
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return output
}