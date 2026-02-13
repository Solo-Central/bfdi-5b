const fs = require("fs");
const path = require("path");

const baseDir = "/home/veeten/public/games/ports/bfdi5b/";          
const output = "./manifest.json";

function walk(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath, fileList);
        } else {
            fileList.push(fullPath.replace(/\\/g, "/"));
        }
    });
    return fileList;
}

const files = walk(baseDir);
fs.writeFileSync(output, JSON.stringify(files, null, 2));

console.log("Manifest generated:", files.length, "files");
