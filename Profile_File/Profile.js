window.addEventListener("DOMContentLoaded", function () {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
        Picture.src = savedPic;
    }
});

const PicBtn = document.getElementById("PicChange")
const Imgselector = document.getElementById("ImageSelect")
PicBtn.addEventListener("click", function () {
    Imgselector.style.display = "grid";
});
const Picture = document.getElementById("Picture")
document.getElementById("Submit").addEventListener("click", function (event) {
    const file = document.getElementById("InputFile").files[0]

    if (!file) {
        alert("File not selceted")
        return;
    }

    const reader = new FileReader()

    reader.onload = function (e) {
        Picture.src = e.target.result;
    };

    reader.onerror = function () {
        alert("Error reading file");
    };

    reader.readAsDataURL(file);

    Imgselector.style.display = "none";
});

document.getElementById("Save").addEventListener("click", function (event) {
    event.preventDefault();

    const file = document.getElementById("InputFile").files[0];

    if (!file) {
        alert("No file selected");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);


    fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.json()) 
    .then(data => { 
        console.log(data);
        Picture.src = data.imageUrl; 
        localStorage.setItem("profilePic", data.imageUrl);
        alert("Image saved!");
    })
    .catch(err => {
        console.error(err);
        alert("Upload failed");
    });
});