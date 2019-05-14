const fs = require('fs');
const libMustache = require('mustache');
let template, view;
function readFile(jsonFile, htmlFile, buildFile) {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(jsonFile, 'utf-8', (error, data) => {
        if (!error) {
          view = JSON.parse(data);
          fs.readFile(htmlFile, 'utf-8', (error, data) => {
            if (!error) {
              template = data;
              fs.writeFile(buildFile, libMustache.render(template, view), (error) => {
                if (!error) resolve('Success');
                else reject(error);
              });
            }
            else reject(error);
          });
        }
        else reject(error);
      });
    });
  }
  catch (error) {
    reject(error);
  }
}
readFile('data.json', 'template.html', 'build.html')
  .then(
    result => console.log(result),
    error => console.log(error)
  );
