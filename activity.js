let fs=require('fs');
let path=require('path')
let input=process.argv.slice(2);
let inputFolder=input[0];

let extensions={
    "Images":['.png','.jpg','.jpeg','.gif'],
    'Audio':['.mp3'],
    'Documents':['.pdf','.txt','.doc','.json'],
    'Compressed':['.zip','.rar'],
    'Videos':['.mkv','.mp4']
}
let content=fs.readdirSync(inputFolder);

let extentionFolder=inputFolder;
function checkFolder(extension,folderPath) {
    
    for(let key in extensions){
        let arr=extensions[key];
        let eon=arr.includes(extension);
        if(eon==true)
        {
            extentionFolder=path.join(folderPath,key);
            console.log(extentionFolder);
            break;
        }
    
    }
    return fs.existsSync(extentionFolder);
}

function createFolder(folder) {
    fs.mkdirSync(folder);
}

function moveFile(oldPath,newPath) {
    fs.renameSync(oldPath,newPath);
}

for(var i=0;i<content.length;i++){
    console.log(content[i]);
    let fileExt=path.extname(content[i]); 
   console.log(fileExt);
//    console.log(checkFolder(fileExt,inputFolder));
   if(!checkFolder(fileExt,inputFolder)){
    createFolder(extentionFolder);
    let newpath=path.join(extentionFolder,content[i]);
    let oldpath=path.join(inputFolder,content[i]);
    moveFile(oldpath,newpath);
      
   }else{
    let newpath=path.join(extentionFolder,content[i]);
    let oldpath=path.join(inputFolder,content[i]);
    moveFile(oldpath,newpath);
   }
}

