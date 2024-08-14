const catchAsyncError = require('../Middleware/catchAsyncError');
const Employee = require('../Models/EmployeeModel');
const sendToken = require('../utils/jwt');

// Create Employee - /api/v1/CreateEmployee

exports.createEmployee = catchAsyncError(async (req, res, next) => {
    // Handle profile image if uploaded
    // let image;
    // if (req.file) {
    //     image = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;
    // }

    const employees = await Employee.find({});
    // Create the employee record
    const employee = await Employee.create({
        ...req.body,
        id: employees.length + 1,
    });
    res.status(200).json({
        success: true,
        employee
    })

})

// Get single Employee - /api/v1/getSingleEmployee

exports.getSingleEmployee = catchAsyncError(async(req,res,next) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
        return next((`Employee not Found with this Id ${req.params.id}`,404))
    }
    res.status(200).json({
        success: true,
        employee
    })
})

// Get All Employee - /api/v1/getSingleEmployee

exports.getEmployee = catchAsyncError(async(req,res,next) => {
    const employee = await Employee.find();

    res.status(200).json({
        success: true,
        employee
    })
})

// Delete Employee - api/v1/deleteEmployee/:id

exports.deleteEmployee = catchAsyncError(async(req,res,next) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
        return next((`Employee not Found with this Id ${req.params.id}`,404))
    }
    await employee.deleteOne();
     res.status(200).json({
        success: true
     })
})

// Update Employee - api/v1/updateEmployee/:id

exports.updateEmployee = catchAsyncError(async(req,res,next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        gender: req.body.gender,
        course: req.body.course,
        status: req.body.status
    };

    let profileImage;
      if(req.file){
        profileImage = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
           newUserData = {...newUserData, profileImage}
      }
      const employee = await Employee.findByIdAndUpdate(req.params.id, newUserData, {
        new : true,
        runValidators : true,

    })
     
    res.status(200).json({
        success : true,
        employee
    })
})