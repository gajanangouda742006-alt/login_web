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

async function loadImages(){

const response = await fetch("/images");

const images = await response.json();

const gallery = document.getElementById("gallery");

gallery.innerHTML="";

images.forEach(img=>{

const image = document.createElement("img");

image.src = img;

gallery.appendChild(image);

});

}

window.onload = loadImages;