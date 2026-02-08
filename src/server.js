const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT|| 3000;


const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS, 
  '/success': dataHandler.success,
  '/badRequest': dataHandler.badRequest,
  '/unauthorized': dataHandler.unauthorized,
  '/forbidden':dataHandler.forbidden,
  '/notImplemented':dataHandler.notImplemented,
  '/internal': dataHandler.internal,
  notFound: dataHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.query = Object.fromEntries(parsedURL.searchParams);
  
  const acceptedTypes = request.headers.accept ?
  request.headers.accept.split(',').map(type => type.trim()) : [`application/json`];

  if(urlStruct[parsedURL.pathname]){
    urlStruct[parsedURL.pathname](request, response, acceptedTypes);
  }else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port, () =>{
    console.log(`Listening on 127.0.0.1:${port}`);
});