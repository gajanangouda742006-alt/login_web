const db = require("../config/db");

exports.uploadPhoto = (req,res)=>{

const sql="INSERT INTO photos(user_id,filename,filepath) VALUES(?,?,?)";

db.query(sql,
[
req.body.userId,
req.file.filename,
"/uploads/"+req.file.filename
],
(err)=>{
if(err) throw err;

res.send("Photo uploaded");
});

};

exports.getPhotos = (req,res)=>{

const sql="SELECT * FROM photos WHERE user_id=?";

db.query(sql,[req.params.userId],(err,result)=>{
res.json(result);
});

};