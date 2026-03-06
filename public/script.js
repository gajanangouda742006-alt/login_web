<<<<<<< HEAD
// REGISTER FUNCTION
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
function register(){

let name = document.getElementById("name").value;

if(name === ""){
alert("Enter your name");
return;
}

alert("Registration Successful");

// open upload page with username
window.location = "upload.html?name=" + encodeURIComponent(name);

}


// UPLOAD IMAGE
async function uploadImage(){

const fileInput = document.getElementById("fileInput");

if(!fileInput || fileInput.files.length === 0){
alert("Select image first");
return;
}

const formData = new FormData();
formData.append("photo", fileInput.files[0]);

await fetch("/upload",{
=======
async function register(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const response = await fetch("/api/register",{
>>>>>>> 068511f9b96cd319cb2b800262979fb952934748
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

<<<<<<< HEAD
loadImages();

=======
>>>>>>> 068511f9b96cd319cb2b800262979fb952934748
}


async function loadImages(){

<<<<<<< HEAD
const gallery = document.getElementById("gallery");
=======
const response = await fetch("/images");

const images = await response.json();
>>>>>>> 068511f9b96cd319cb2b800262979fb952934748

const gallery = document.getElementById("gallery");

const res = await fetch("/images");
const images = await res.json();

gallery.innerHTML = "";

images.forEach(img => {

let image = document.createElement("img");
image.src = img;

<<<<<<< HEAD
=======
images.forEach(img=>{

const image = document.createElement("img");

image.src = img;

>>>>>>> 068511f9b96cd319cb2b800262979fb952934748
gallery.appendChild(image);

});

}

<<<<<<< HEAD
loadImages();


// PASSWORD SHOW / HIDE
function togglePassword(){

let password = document.getElementById("password");

if(!password) return;

if(password.type === "password"){
password.type = "text";
}else{
password.type = "password";
}

}


// SHOW USER NAME
function showUserName(){

const params = new URLSearchParams(window.location.search);
const name = params.get("name");

const welcome = document.getElementById("welcome");

if(name && welcome){
welcome.innerText = "Welcome " + name;
}

}

showUserName();
=======
window.onload = loadImages;
>>>>>>> 068511f9b96cd319cb2b800262979fb952934748
