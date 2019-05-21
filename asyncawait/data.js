const fs = require('fs');
const libMustache = require('mustache');
let template, view;

function readFile(file) {
  return new Promise((resolve,reject) => {
    fs.readFile(file,'utf-8',(error,data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

async function writeFile(jsonFile,htmlFile,buildFile) {
  view=JSON.parse(await readFile(jsonFile));
  template=await readFile(htmlFile);
  fs.writeFile(buildFile,libMustache.render(template,view), (error) => {
    if (error) throw error;
    else console.log('success');
  });
}
writeFile('data,json','template.html','build.html');

