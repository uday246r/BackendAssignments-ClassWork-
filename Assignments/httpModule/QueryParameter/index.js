// "/greet?name = Rahul"

// ........................................................................

// http.createServer((req,res)=>{
// console.log(req.ur()) => return url 
// }

// if(req.url=="/greet") => not work without importing url module .

// const url = require('url')

// ..........................................................................






// const url = require('url')
// http.createServer((req,res)=>{

// const path = url.parse(req.url) =>   path ={
//                                              query: "name : Rahul, id : 10"
//                                              pathname: "/greed"

//                        or

// (true) => return in object formate , otherwise by-Default it return in string formate as above

// const path = url.parse(req.url,true) =>   path ={
//                                              query: {
//                                                       name : Rahul,
//                                                       id : 10"
//                                                      }
//                                              pathname: "/greed"
//                                            }

// if(req.method=="GET" && path.pathname=="/greet"){
// res.write(`Hello ${path.query.name || "Guest"})
// }

//           or

// if(req.method=="GET" && path.pathname=="/greet" && "name" in path.query){
// res.write(`Hello ${path.query.name})
// }

// else{
// res.write("Hello Guest");
// }