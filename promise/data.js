const fs = require('fs');
const libMustache = require('mustache');

let dataJson; let template; let view; let promiseJson; let promiseHtml; let promiseWrite;
fs.readFile('data.json', 'utf-8', (err, data) => {
  promiseJson = new Promise((resolve, reject) => {
    if (err) reject(err);
    else resolve(data);
  });
  promiseJson.then(
    (addText) => { dataJson = addText; view = JSON.parse(dataJson); },
    error => console.log(error),
  );
});
fs.readFile('template.html', 'utf-8', (err, data) => {
  promiseHtml = new Promise((resolve, reject) => {
    if (err) reject(err);
    else resolve(data);
  });
  promiseHtml.then(
    addText => template = addText,
    error => console.log(error),
  );
});

function waitForReadFile() {
  setTimeout(() => {
    if ((!view) || (!template)) waitForReadFile();
    else {
      const output = libMustache.render(template, view);
      fs.writeFile('build.html', output, (err) => {
        promiseWrite = new Promise((resolve, reject) => {
          if (err) reject(err);
          else resolve('Success!');
        });
        promiseWrite.then(
          success => console.log(success),
          error => console.log(error),
        );
      });
    }
  }, 100);
}
waitForReadFile();
