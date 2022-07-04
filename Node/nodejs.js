const http = require("http");

http
  .createServer((req, res) => {
    console.log(req);
    console.log("Run on browser request");
    // nodejs
    // res.write("<h1>Home Page</h1>");
    switch (req.url) {
      case "/":
        res.write("<h1>HomePage</h1>");        
        break;
      case "/asad":
        res.write("<h1>I am Asad</h1>");        
        break;
      case "/asad.html":
        res.write("<h1>Now the url is: /asad.html instead of /asad</h1> <h3>Now browser is asuming that this .html file but actually we just dodged it rather than original file</h3>");        
        break;
    
      default:
        res.write("<h3>Page not found</h3>");        

        break;
    }
    
  })
  .listen(3000);
