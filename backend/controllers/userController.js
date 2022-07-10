const asyncHandler = require('express-async-handler')
const db = require('../models')
const User = db.Users
const generateToken = require('../util/generateToken')


// Registeration


const registeredUser = asyncHandler(async(req,res) => {
    const {firstName,lastName,email,phoneNo,password,cpassword,city,country,state,zipCode} = req.body
    const userExist = await User.findOne({where:{ email }});

    if (userExist) {
        res.status(400);
        throw new Error("User Already Exist");
        // throw (new ErrorHandler("User Not Exist", 400));
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        cpassword,
        phoneNo,
        city,
        country,
        state,
        zipCode
    });

    if (user) {
        res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            lastName:user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            phoneNo:user.phoneNo,
            city:user.city,
            country:user.country,
            state:user.state,
            zipCode:user.zipCode,
            token: generateToken(user.id)
        });
    } else {
        res.status(400);

        throw new Error("Invalid Data")
    }
})



// Login
const login = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({where:{email}})

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            city: user.city,
            country:user.country,
            phoneNo:user.phoneNo,
            state:user.state,
            zipCode:user.zipCode,
            isAdmin: user.isAdmin,
            enabled:user.enabled,
            token: generateToken(user.id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email & Password ");
    }
})



// Get All User

const getAllUser = asyncHandler(async(req,res) => {
    const user = await User.findAll({});
    if(user) {
        res.status(201).json({
            user
        })
    } else {
        res.status(400);
        throw new Error("No User Found")
    }
})


// get particular user


const getUserById = asyncHandler(async(req,res)=> {
    const user = await User.findByPk(req.params.id)

    if(user) {
        res.status(201).json({
            user
        })
    } else {
        res.status(400);
        throw new Error("user Not Found")
    }
})


// Delete Category

const deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findByPk(req.params.id);

    if(user) {
        await User.destroy({where:{id:req.params.id}})

        res.status(201).json({message:"User Deleted Successfully"})
    } else {
        res.status(400);
        throw new Error("Error in Deleting the User")
    }
})


// Update Category

const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findByPk(req.params.id)

    if(user) {

        user.firstName = req.body.name || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password
        user.cpassword = req.body.cpassword || user.cpassword
        user.city = req.body.city || user.city
        user.country = req.body.country || user.country
        user.phoneNo = req.body.phoneNo || user.phoneNo
        user.isAdmin = req.body.isAdmin || user.isAdmin
        user.state = req.body.state || user.state
        user.zipCode = req.body.zipCode || user.zipCode


        const updateUser = await user.save();
        res.status(201).json({

            updateUser

        })

    } else {
        res.status(400);
        throw new Error("Updation Failed")
    }
})



module.exports = {registeredUser,login,getAllUser,getUserById,updateUser,deleteUser}
