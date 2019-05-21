const fs = require('fs');
const libMustache = require('mustache');


function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

function writeFile(file, template, view) {
  fs.writeFile(file, libMustache.render(template, view), (error) => {
    if (error) throw error;
    else console.log('Success');
  });
}

async function buildFile(jsonFile, htmlFile, buildFile) {
  const view = JSON.parse(await readFile(jsonFile));
  const template = await readFile(htmlFile);
  writeFile(buildFile, template, view);
}

buildFile('data.json', 'template.html', 'build.html');

