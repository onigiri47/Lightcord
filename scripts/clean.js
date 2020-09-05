/* 
    This script removes ignored directories 
    By default it only removes all the "node_modules" directories.
    Using it with "all" removes the "dist", "distApp", and "builds" dirs too.
    To run this script, use `npm run clean` or `npm run clean:all`.
*/
let test;
try {
     test = require("fs-extra")
} catch (err) {
    console.error("This script won't work unless you've installed node_modules.")
    process.exit(1)
}
const fs = test;
const glob = require("fast-glob")
const {resolve,join} = require("path");

const projectDir = resolve(__dirname, "..")

var args = process.argv.slice(2);


let dirsToRemove;
const node_modules = glob.sync("+(**/node_modules|node_modules)", {absolute:true, onlyDirectories:true, cwd:projectDir})
const dist = join(projectDir, "dist");
const distApp = join(projectDir, "distApp");
const builds = join(projectDir, "builds");

// regular clean means removing only node_modules
dirsToRemove = node_modules;
// clean all means removing all dirs.
if (args[0] === "--all"){
    dirsToRemove = node_modules.concat([dist, distApp, builds])
}

dirsToRemove.forEach((dir)=>{
    fs.remove(dir);
})