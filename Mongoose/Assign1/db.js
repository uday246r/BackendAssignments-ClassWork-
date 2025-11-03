const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://uday246r:UDAY246ss@namastenode.uroqj.mongodb.net/mongoAssignment");


const employeeSchema = new mongoose.Schema({
    empid:{
        type: Number,
        unique:true,
    },
    name:{
        type: String,
    },
    salary:{
        type: Number,
    },
    deptid:{
        type: Number,
    },
})

const departmentSchema = new mongoose.Schema({
    depttid:{
        type: Number,
        unique:true,
    },
    deptname:{
        type:String,
    }
})


const Employees = mongoose.model("Employee", employeeSchema);
const Department = mongoose.model("Department", departmentSchema);

module.exports={
    Employees,
    Department
}