const fs=require('fs');
var data=fs.readFileSync('data.json','utf8');
var template=fs.readFileSync('template.html','utf8');
var lib=require('mustache')
var output=lib.render(template,data);


