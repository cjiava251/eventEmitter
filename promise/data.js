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

readFile('data.json')
  .then(
    jsonData => {
      view = JSON.parse(jsonData);
      return 'template.html';
    })
  .then(
    htmlFile => {
      return readFile(htmlFile);
    })
  .then(
    htmlData => {
      template = htmlData;
      fs.writeFile('builder.html', libMustache.render(template, view), (error) => {
        if (error) throw error;
        else console.log('success');
      });
    })
  .catch(
    error => console.log(error)
  );
