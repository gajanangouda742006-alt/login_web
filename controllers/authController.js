const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{

const hashed = await bcrypt.hash(req.body.password,10);

const sql = "INSERT INTO users(username,email,password) VALUES(?,?,?)";

db.query(sql,[req.body.username,req.body.email,hashed],(err)=>{
if(err) throw err;

res.send("User Registered");
});

};

exports.login = (req,res)=>{

const sql = "SELECT * FROM users WHERE email=?";

db.query(sql,[req.body.email],async (err,result)=>{

if(result.length===0){
return res.send("User not found");
}

const user = result[0];

const valid = await bcrypt.compare(req.body.password,user.password);

if(!valid){
return res.send("Wrong password");
}

const token = jwt.sign({id:user.id},"secretkey");

res.json({token,userId:user.id});

});

};