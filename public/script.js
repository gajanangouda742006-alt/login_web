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
method:"POST",
body:formData
});

alert("Image Uploaded");

loadImages();

}


async function loadImages(){

const gallery = document.getElementById("gallery");

if(!gallery) return;

const res = await fetch("/images");
const images = await res.json();

gallery.innerHTML = "";

images.forEach(img => {

let image = document.createElement("img");
image.src = img;

gallery.appendChild(image);

});

}

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