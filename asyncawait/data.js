const fs = require('fs');
const libMustache = require('mustache');

let dataJson; let template; let view; let promiseJson; let promiseHtml; let promiseWrite;
async function awaitJSON(err) {
  try {
    dataJson = await promiseJson;
    view = JSON.parse(dataJson);
  }
  catch {
    console.log(err);
  }
}
async function awaitHTML(err) {
  try {
    template = await promiseHtml;
  }
  catch {
    console.log(err);
  }
}
async function writeHTML() {
  let result = await promiseWrite;
  console.log(result);
}
fs.readFile('data.json', 'utf-8', (err, data) => {
  promiseJson = new Promise((resolve, reject) => {
    if (err) reject(err);
    else resolve(data);
  });
  awaitJSON(err);

});

fs.readFile('template.html', 'utf-8', (err, data) => {
  promiseHtml = new Promise((resolve, reject) => {
    if (err) reject(err);
    else resolve(data);
  });
  awaitHTML(err);
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
        writeHTML();
      });
    }
  }, 100);
}
waitForReadFile();
