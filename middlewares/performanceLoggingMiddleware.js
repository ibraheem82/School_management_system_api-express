const performanceMW = (req, res, next) => {
    // This line captures the current timestamp at the beginning of the request processing using Date.now(). This timestamp will be used later to calculate the processing time.
    const start = Date.now();
  
    next();
  

    // After the response is sent (potentially after the route handler is finished), this line calculates the time difference between the start time (start) captured earlier and the current time (Date.now()). This represents the total processing time for the request.
    const delta = Date.now() - start;
    // req.method: The HTTP method used in the request (GET, POST, etc.).
    // req.url: The URL path of the request.
    // res.statusCode: The HTTP status code of the response (e.g., 200 for success).
    // delta (in milliseconds): The calculated processing time for the request.
    console.log(`${req.method} ${req.url} ${res.statusCode} ${delta}ms`);
  };


  module.exports = performanceMW ;