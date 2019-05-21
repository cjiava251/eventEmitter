const fs = require('fs');
const libMustache = require('mustache');
let template, view;

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) reject(error);
      else resolve(data);
    })
  });
}

function writeFile(file) {
  fs.writeFile(file, libMustache.render(template, view), (error) => {
    if (error) throw error;
    else console.log('success');
  });
}

function buildFile(jsonFile, htmlFile, buildFile) {
  readFile(jsonFile)
    .then(
      jsonData => {
        view = JSON.parse(jsonData);
        return readFile(htmlFile);
      })
    .then(
      htmlData => {
        template = htmlData;
        writeFile(buildFile);
      })
    .catch(
      error => console.log(error)
    );
}

buildFile('data.json', 'template.html', 'build.html');


