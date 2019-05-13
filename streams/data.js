const fs=require('fs');
function tail(readableFile,stringCount,writableFile) {
    let readableStream=fs.createReadStream(readableFile,{encoding: 'utf-8',start: 0});
    let writableStream=fs.createWriteStream(writableFile);
    var data,stringOfData,splicedData;
    readableStream.on('data',(chunk) => {
        data=chunk.split('\n');
        if (data.length>=stringCount)
        {
            splicedData=data.splice(data.length-stringCount,stringCount);
            stringOfData=splicedData.join('\n');
            writableStream.write(stringOfData);
            readableStream.pipe(writableStream);
        }
        else throw new Error('Too many strings');
    });
}
tail('data.js',9,'data.txt');