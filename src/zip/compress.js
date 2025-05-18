// compress.js - implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import os from 'os';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToCompress = path.join(__dirname, 'files/fileToCompress.txt');
  const destinationFile = path.join(__dirname, 'files/archive.gz');

  const sourceStream = fs.createReadStream(fileToCompress);
  const destinationStream = fs.createWriteStream(destinationFile);
  const gzipStream = zlib.createGzip();

  sourceStream.pipe(gzipStream).pipe(destinationStream);

  destinationStream.on('finish', () => {
    process.stdout.write(`File compressed to ${destinationFile}${os.EOL}`);
  });
};

await compress();
