const fs = require('fs');

function tail(readableFile, writableFile, stringCount = 10) {
  const readableStream = fs.createReadStream(readableFile, { encoding: 'utf-8', start: 0 });
  const writableStream = fs.createWriteStream(writableFile);
  readableStream.pipe(writableStream);

  readData()
    .then(
      data => {
        process.stdout.write(data);
      },
    )
    .catch(
      error => console.log(error)
    )

  function readData() {
    return new Promise((resolve) => {
      let data = "";
      readableStream.on('data', (chunk) => {
        data += chunk;
      });
      readableStream.on('end', () => {
        const dataArray = data.split('\n');
        const splicedData = dataArray.splice(dataArray.length - stringCount, stringCount);
        const stringOfData = splicedData.join('\n');
        resolve(stringOfData);
      });
    });
  }
}

tail('datas.txt', 'data.txt');


