window.addEventListener("DOMContentLoaded", function () {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
        Picture.src = savedPic;
    }
    const savedGenre = this.localStorage.getItem("Genre");
    if (savedGenre) {
        Genre.value = savedGenre;
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
        alert("File not selected")
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

const Genre = document.getElementById("Genre")
document.getElementById("Save").addEventListener("click", function (event) {
    event.preventDefault();

    const file = document.getElementById("InputFile").files[0];

    if (!file) {
        localStorage.setItem("Genre", Genre.value)
        alert("Your changes have been saved")
        return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("oldImage", Picture.src);

    fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Picture.src = data.imageUrl;
            localStorage.setItem("profilePic", data.imageUrl);
            localStorage.setItem("Genre", Genre.value)
            alert("Image saved!");
        })
        .catch(err => {
            console.error(err);
            alert("Upload failed");
        });
});