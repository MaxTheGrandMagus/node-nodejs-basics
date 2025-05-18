/*
  decompress.js - implement function that decompresses archive.gz back to the fileToCompress.txt with same content as before
  compression using zlib and Streams API
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import os from 'os';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const archiveFile = path.join(__dirname, 'files/archive.gz');
  const destinationFile = path.join(__dirname, 'files/fileToCompress.txt');

  const sourceStream = fs.createReadStream(archiveFile);
  const destinationStream = fs.createWriteStream(destinationFile);
  const gunzipStream = zlib.createGunzip();

  sourceStream.pipe(gunzipStream).pipe(destinationStream);

  destinationStream.on('finish', () => {
    process.stdout.write(`File decompressed to ${destinationFile}${os.EOL}`);
  });
};

await decompress();
