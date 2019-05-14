const fs = require('fs');
const libMustache = require('mustache');
let view; let template;
function readFile(jsonFile, htmlFile, buildFile) {
	try {
		fs.readFile(jsonFile, 'utf-8', (err, data) => {
			if (!err) {
				view = JSON.parse(data);
				fs.readFile(htmlFile, 'utf-8', (err, data) => {
					if (!err) {
						template = data;
						fs.writeFile(buildFile, libMustache.render(template, view), (err) => {
							if (!err)
								console.log("Success");
							else throw err;
						});
					}
					else throw err;
				});
			}
			else throw err;
		});
	}
	catch (error) {
		throw error;
	}
}
readFile('data.json', 'template.html', 'build.html');
