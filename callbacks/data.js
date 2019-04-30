const fs = require('fs');
const libMustache = require('mustache');

let dataJson; let template; let view;
fs.readFile('data.json', 'utf-8', (err, data) => {
	if (err) throw err;
	else dataJson = data;
	view = JSON.parse(dataJson);
});
fs.readFile('template.html', 'utf-8', (err, data) => {
	if (err) throw err;
	else template = data;
});

function waitForReadFile() {
	setTimeout(() => {
		if ((!view) || (!template)) waitForReadFile();
		else {
			const output = libMustache.render(template, view);
			fs.writeFile('build.html', output, (err) => {
				if (err) throw err;
				else console.log('Success!');
			});
		}
	}, 100);
}
waitForReadFile();
