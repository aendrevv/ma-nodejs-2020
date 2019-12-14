const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');
const { URL } = require('url');

console.time();

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName);
const outputFile = path.join(process.cwd(), outputDirName, outputFileName);

async function getInputFileList() {
  let files;
  try {
    files = await fsp.readdir(inputDir);
  } catch (error) {
    throw new Error(`Error !`);
  }
  return files.map(file => path.join(inputDir, file));
}

async function getObjectFromFile(filePath) {
  let object;
  try {
    const compressedBuffer = await fsp.readFile(filePath);
    const jSonBuffer = await gunzip(compressedBuffer);
    const jSon = jSonBuffer.toString();
    object = JSON.parse(jSon);
  } catch (error) {
    console.error(error);
    throw new Error(`Error !`);
  }
  return object;
}

function rebuildUrl(originalUrl) {
  let url = new URL(originalUrl);

  const { pathname } = url;
  const fileExt = path.extname(pathname);
  const fileName = path.basename(pathname, fileExt);
  url.protocol = 'https';
  url.pathname = '/devices';
  url.search = `?file=${fileName}&type=${fileExt}`;

  return url;
}

async function buildOutputObject(files) {
  const result = {};
  for (const file of files) {
    let object;
    try {
      // eslint-disable-next-line no-await-in-loop
      object = await getObjectFromFile(file);
    } catch (error) {
      console.error(error);
      throw new Error(`Error !`);
    }
    object.url = rebuildUrl(object.url);
    const name = path.basename(file.toLowerCase(), 'json.gz');
    result[name] = object;
  }
  return result;
}

async function saveOutput(object) {
  const buffer = Buffer.from(JSON.stringify(object));
  const gzipedBuffer = await gzip(buffer);
  await fsp.writeFile(outputFile, gzipedBuffer);
}

async function start() {
  const inputFiles = await getInputFileList();
  try {
    const outputObject = await buildOutputObject(inputFiles);
    await saveOutput(outputObject);
  } catch (error) {
    console.error(error);
    throw new Error(`Error !`);
  }
}

start()
  .then(() => console.log(`\nCheck ${outputDirName.toUpperCase()} please :-)\n`))
  .catch(err => console.error('🐞  🤪  🐛\n', err));
