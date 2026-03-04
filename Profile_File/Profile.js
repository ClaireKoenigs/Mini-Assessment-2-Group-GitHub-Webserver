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
