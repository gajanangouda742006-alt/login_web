async function register(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const response = await fetch("/api/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:name,
email:email,
password:password
})
});

const result = await response.text();

alert(result);

// go to upload page
window.location.href = "upload.html";

}


async function uploadImage(){

const fileInput=document.getElementById("fileInput");

const formData=new FormData();

formData.append("photo",fileInput.files[0]);
formData.append("userId",localStorage.getItem("userId") || 1);

await fetch("/api/upload",{
method:"POST",
body:formData
});

alert("Uploaded");

}

async function loadImages(){

const userId = localStorage.getItem("userId") || 1;

const res = await fetch("/api/photos/"+userId);

const photos = await res.json();

const gallery = document.getElementById("gallery");

if(!gallery) return;

gallery.innerHTML="";

photos.forEach(photo=>{

const img=document.createElement("img");

img.src=photo.filepath;
img.style.width="200px";

gallery.appendChild(img);

});

}

window.onload=loadImages;