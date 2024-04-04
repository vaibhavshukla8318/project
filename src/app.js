require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
require("./db/conn");


const auth = require('./middleware/auth');

const Register = require("./models/registers");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path =  path.join(__dirname, "../public");
const template_path =  path.join(__dirname, "../templates/views");
const partial_path =  path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path )); 
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path)

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/logout", auth, async(req, res) => {
    try {
        console.log(req.user);

        // for single device logout
        // req.user.tokens = req.user.tokens.filter((currElement) =>{
        //     return currElement.token !== req.token
        // })

        // for multiple device logout
        req.user.tokens = [];

        res.clearCookie("jwt")
        console.log("logout successfully");
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/register", (req, res) => {
    res.render("register")
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/portfolio", auth, (req, res) => {
    res.render("portfolio");
});
app.get("/project", (req, res) => {
    res.render("project");
});

// Show confirmation form for account deletion
app.get('/delete-account', auth, (req, res) => {
    res.render('delete-account');
});


app.post("/register", async(req, res) => {
    try {
      const password = req.body.password;
      const cpassword = req.body.confirmPassword;

      if(password === cpassword){
            const registerEmployee = new Register({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                number : req.body.number,
                email : req.body.email,
                // gender : req.body.gender,
                password : password,
                confirmPassword : cpassword
            })

        const token = await registerEmployee.generateAuthToken(); 

        res.cookie("jwt", token, {
            expires:new Date(Date.now() + 5000000),
            httpOnly:true
        });
        // console.log(cookie);

        const registered = await registerEmployee.save();
        res.status(201).render("login");
      }
      else{
        res.send("password is not matching")
      }

    } catch (error) {
        res.status(400).send(error);
    }
});

// login
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Check if the email and password match a registered user
        const user = await Register.findOne({ email: email});

        const isMatch = await bcrypt.compare(password, user.password);
        const token = await user.generateAuthToken(); 
        // console.log("The Token Part" + token);

        res.cookie("jwt", token, {
            expires:new Date(Date.now() + 5000000),
            httpOnly:true
        });

        if (isMatch) {
            // Successful login, you may want to create a session or use a token for authentication
            res.status(200).render("portfolio");
        } else {
            // Invalid credentials
            res.status(401).send("Invalid email or password");
        }
    } catch (error) {
        res.status(500).send("Error");
    }
});



// Delete account route (handling form submission)
app.post('/delete-account', auth, async (req, res) => {
    try {
        const deletedUser = await Register.findOneAndDelete({ _id: req.user._id });
        
        if (deletedUser) {
            // Account successfully deleted
            res.clearCookie('jwt');
            return res.status(200).render('register', { deletedUser }); // Render the 'deleted-account' page with user information
        } else {
            // No user found to delete
            return res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});



 app.listen(port, () =>{
    console.log(`server is running in port no. ${port}`);
 })