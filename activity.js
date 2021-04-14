let fs=require('fs');
let path=require('path')

//Taking input from user
let input=process.argv.slice(2);
let inputFolder=input[0];

// javascript file extensions with javascript folder name
let extensions={
    "Images":['.png','.jpg','.jpeg','.gif'],
    'Audio':['.mp3'],
    'Documents':['.pdf','.txt','.doc','.json'],
    'Compressed':['.zip','.rar'],
    'Videos':['.mkv','.mp4']
}
// read the input folder
let content=fs.readdirSync(inputFolder);

//new folder path
let extentionFolder=inputFolder;

//Check folder is created or not
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

// create folder
function createFolder(folder) {
    fs.mkdirSync(folder);
}

//move file form one folder to other folder
function moveFile(oldPath,newPath) {
    fs.renameSync(oldPath,newPath);
}

// reading all file of given input folder
for(var i=0;i<content.length;i++){
    console.log(content[i]);
    let fileExt=path.extname(content[i]); 
   console.log(fileExt);
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

