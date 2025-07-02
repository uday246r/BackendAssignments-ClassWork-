const employees = [
    { name: "John", salary: {basic: 20000, bonus: 5000}},
    { name: "Alice", salary: {basic: 25000}},
    { name: "Bob"},
    { name: "Carol", salary: {basic: 30000, bonus: 10000}},

]


// using map

// employees.map((e)=>{
//     if(e.salary){
//         if(e.salary.basic && e.salary.bonus) console.log(e.salary.basic + e.salary.bonus);
//         else console.log(e.salary.basic);
//     }
//     else{
//         console.log("Salary not found");
//     }
// })

// usinf forEach()

function getEmployeeSalary(employees){
    
  const sale = [];
  employees.forEach((value,index)=>{
        if(value.salary ){
            sale.push(value.salary.basic+ (value.salary.bonus | 0));
        }
        else{
            sale.push("Salary not found");
        }
  })
 return sale;
}
const print = getEmployeeSalary(employees);
console.log(print);