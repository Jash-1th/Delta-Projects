const exp = require("constants");
const express = require("express");
const path = require("path");
const {v4 : uuid4} = require("uuid");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");

const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/jobPortal';
main()
.then(()=>{
    console.log("connection successfully made");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
   await mongoose.connect(MONGOOSE_URL);
}

const app = express();
let port = 3000;
app.listen(port,()=>{
    console.log(`listinening on the port ${port}`);
});

const sessionOptions = {
    
    secret :"mysecreteCode",
    resave:false,
    saveUninitialized:true,
    cookie : {secure : false}
}

app.use(session(sessionOptions));
app.use(flash());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs" , ejsMate);


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser= req.user;
    next();
})


app.get("/jobportal" , (req , res)=>{
    res.render("user/signUp.ejs");
})

app.post("/jobportal",async(req , res , next)=>{
        console.log("in job");
        try{
            let {username , email , password , mobielNumber} = req.body;
            let fakeUser = new User({
           username,
           email,
          
           mobielNumber
        });
    
      let registeredUser = await  User.register(fakeUser , password);
      req.login(registeredUser , (err)=>{
        if(err){
             return  next(err);
        }else{
            console.log("in post method");
            req.flash("success" , `${req.user.username} Welcome to Jobportal`);
           return  res.redirect("/jobportal/index")
        }
      })
      
        }catch(err){
            console.log(err.message);
            req.flash("error" , err.message);
            res.redirect("/jobportal");
        }
     
    }
)

app.get("/jobportal/login",(req,res)=>{
    res.render("user/login.ejs")
})

app.post("/jobportal/login",passport.authenticate("local" , {failureFlash:true , failureRedirect:'/jobportal/login'}),(req , res)=>{
    req.flash("success" , `${req.user.username} Welcome to Jobportal`);
    
    res.redirect("/jobportal/index");
}
)

app.get("/jobportal/index", (req ,res)=>{
    res.render("index.ejs");
})

app.post("/jobportal/search",async (req , res)=>{
    if(!req.user){
        req.flash("error","You must be loged in to search");
        res.redirect("/jobportal/login")
    }else{

        console.log(req.body);
        let skills = req.body.skills;
        console.log(skills);
        
        res.render("show.ejs",{skills});
    }
})