// You are given an array of product objects with array-based categories.
const products = [
    { name: 'Pen', categories: ['stationery', 'writing'] },
    { name: 'Laptop', categories: ['electronics', 'computers'] },
    { name: 'Chair', categories: [] },
    { name: 'Water Bottle', categories: ['kitchen', 'storage'] }
];


// Task:
// Write a function to:
// Return a new array of strings in the format:
//  "<Product Name>: <Category1>, <Category2>".


// If categories array is empty, return:
//  "<Product Name>: No Categories".

const newArray=[];
products.map((e,index)=>{
newArray.push(`${e.name} : ${e.categories[index] || "No Category"}, ${e.categories[index+1] || "No Category"}`);
})


console.log(newArray);