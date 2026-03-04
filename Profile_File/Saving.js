import fs from 'fs';

const data = fs.createWriteStream();
document.getElementById("ProSave").addEventListener("click",function(event){
    data._write(JSON.stringify(document.getElementById("ProfilePic")));
    data.close();
})