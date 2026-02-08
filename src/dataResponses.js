//a function that responds with a json object
const respondData = (request, response, status, object, type) => {
    let objMes = ``;
    const content = JSON.stringify(object);

    if(type === "text/xml" ){
      objMes += `<response><message>`;
      objMes += `${object.message}</message>`;
      objMes += `<id>${object.id}</id>`
      objMes += `</response>`;
    }else if(type === "application/json"){
      objMes += content;
    }

    //header related stuff
    const headers = {
        "Content-Type": type,
        "Content-Length": Buffer.byteLength(objMes, 'utf8'),
    };

    response.writeHead(status, headers);

    response.write(objMes);

    response.end();
}

const success = (request, response, acceptedTypes) => {
  // message to send
  const responseMessage = {
    message: 'This is a successful response',
    id: `Success`,
  };

  // send our json with a success status code
  respondData(request, response, 200, responseMessage, acceptedTypes[0]);
};

const badRequest = (request, response, acceptedTypes) => {
  const responseMes = {
    message: 'This request has the required parameters',
    id: 'badRequest',
  };

  // if the request does not contain a valid=true query parameter
  if (!request.query.valid || request.query.valid !== 'true') {
    // set our error message
    responseMes.message = 'Missing valid query parameter set to true';
    // return with a 400 bad request code
    return respondData(request, response, 400, responseMes, acceptedTypes[0]);
  }
  return respondData(request, response, 200, responseMes, acceptedTypes[0]);
}

const unauthorized = (request, response, acceptedTypes) => {
  const responseMes = {
    message: 'This request has the required parameters',
    id: 'unauthorized',
  };
  // if the request does not contain a valid=true query parameter
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    // set our error message
    responseMes.message = 'Missing loggedIn query parameter set to yes';
    // return with a 401 unauthorized code
    return respondData(request, response, 401, responseMes, acceptedTypes[0]);
  }
  return respondData(request, response, 200, responseMes, acceptedTypes[0]);
}

const forbidden = (request, response, acceptedTypes) => {
  const responseMes = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  return respondData(request, response, 403, responseMes, acceptedTypes[0]);
}

const internal = (request, response, acceptedTypes) => {
  const responseMes = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };
  return respondData(request, response, 500, responseMes, acceptedTypes[0]);
}

const notImplemented = (request, response, acceptedTypes) => {
  const responseMes = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  return respondData(request, response, 501, responseMes, acceptedTypes[0]);
}

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id
  const responseMes = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondData(request, response, 404, responseMes, acceptedTypes[0]);
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};