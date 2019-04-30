const fs=require('fs');
function tail(file,char) {
    var readableStream=fs.createReadStream(file,{encoding: 'utf-8',start: char});
    var writebleStream=fs.createWriteStream('data2.js');
    readableStream.pipe(writebleStream);
    var str;
    readableStream.on('data',(chunk) => {
        str=chunk;
        //написать код для извлечения Х последних строк
    });
    
}


tail('data.js',0);