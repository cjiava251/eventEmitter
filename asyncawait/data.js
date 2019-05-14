const fs = require('fs');
const libMustache = require('mustache');
let template, view;
async function readFile(jsonFile,htmlFile,buildFile) {
  try {
    var promise = new Promise((resolve, reject) => {
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
  let result=await promise;
  console.log(result);
}
readFile('data.json','template.html','building.html');
