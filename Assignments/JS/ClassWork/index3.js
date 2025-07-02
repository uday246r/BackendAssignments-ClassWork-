// You are required to write a JavaScript function that simulates the backend login process.

// Requirements:
// The function should accept one argument, which is an object containing username and password.

// Example input:

// { username: 'john', password: '1234' }

// The system has a predefined array of user objects like this:

const users = [
    { username: 'john', password: '1234' },
    { username: 'alice', password: 'abcd' },
    { username: 'bob', password: 'pass' }
];

// Your function should:

// Check if the username exists in the users array.

// If not found, return the message:
//  "Username not found"

// If the username exists but the corresponding password does not match, return:
//  "Invalid password"

// If both username and corresponding password match, return:
//  "Login success"


function authenticate(user,pass){
        const filterUser = users.find((e)=>e.username==user) 
         console.log(filterUser);
         if(!filterUser){
            console.log("User not found");
         }
         else if(filterUser.username==user && filterUser.password==pass){
            console.log("Login Sucess");
         }
         else{
            console.log("Password incorrect");
         }

        //const filterUser = users.filter((e)=>e.username==user && e.password==pass) 
        // if(filterUser.length!=0){
        //     console.log("Login Success");
        // }
        // else{
        //     console.log("Login Fail");
        // }

    // users.map((e)=>{
    //     if(e.username===user && e.password===pass){    // if we try to return from the loop in forEach,map and filter it will not happen as it return from callback not from the forEach,map or filter 
    //         console.log("Login Success");
    //         return;
    //     }
    //     else if(e.username==user && e.password!=pass){
    //         console.log("Invalid Password");
    //         return;
    //     }
    //     else{
    //         console.log("Username not found");
    //         return;
    //     }
    // })
}
authenticate('john','1234');