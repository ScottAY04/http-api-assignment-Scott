const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT|| 3000;


const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS, 
};

const onRequest = (request, response) => {
    console.log(request.url);

    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    if(urlStruct[parsedURL.pathname]){
        return urlStruct[parsedURL.pathname](request, response);
    }
};

http.createServer(onRequest).listen(port, () =>{
    console.log(`Listening on 127.0.0.1:${port}`);
});