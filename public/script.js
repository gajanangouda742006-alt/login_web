function register(){

let name=document.getElementById("name").value;

if(name==""){
alert("Enter your name");
return;
}

alert("Registration Successful");

window.location="upload.html";
}

async function uploadImage(){

const fileInput=document.getElementById("fileInput");

if(fileInput.files.length===0){
alert("Select image first");
return;
}

const formData=new FormData();
formData.append("photo",fileInput.files[0]);

await fetch("/upload",{
method:"POST",
body:formData
});

alert("Image Uploaded");

loadImages();
}

async function loadImages(){

const res=await fetch("/images");
const images=await res.json();

const gallery=document.getElementById("gallery");

if(!gallery) return;

gallery.innerHTML="";

images.forEach(img=>{
let image=document.createElement("img");
image.src=img;
gallery.appendChild(image);
});
}

loadImages();