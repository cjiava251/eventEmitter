const fs = require('fs');

function tail(readableFile, writableFile, stringCount) {
  const readableStream = fs.createReadStream(readableFile, { encoding: 'utf-8', start: 0 });
  const writableStream = fs.createWriteStream(writableFile);
  const tailStream = fs.createWriteStream('laststrings.txt');
  readableStream.pipe(writableStream);
  if (stringCount === undefined)
    stringCount = 10;
  let data = '';
  readableStream.on('data', (chunk) => {
    data += chunk;
  });
  writableStream.on('finish', () => {
    const dataArray = data.split('\n');
    const splicedData = dataArray.splice(dataArray.length - stringCount, stringCount);
    const stringOfData = splicedData.join('\n');
    tailStream.write(stringOfData);
    tailStream.end();
    process.stdout.write(stringOfData)
  });
}

tail('datas.txt', 'data.txt');


