const users = {};

//a function that responds with a json object
const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);

    //header related stuff
    const headers = {
        "Content-Type": 'application/json',
        "Content-Length": Buffer.byteLength(content, 'utf8');
    };

    response.writeHead(status, headers);

    if(response.method !== 'HEAD'){ 
        response.writeHead(content);
    }

    response.end();
}