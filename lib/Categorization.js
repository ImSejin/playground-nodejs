const fs = require('fs');
const path = require('path');

const regex = /(\d+)-\d+\..+/;

exports.categorize = (...paths) => {
  const dir = path.join(paths);
  const filenames = fs.readdirSync(dir);

  if (!Array.isArray(filenames)) throw Error('Not array');

  const episodeNums = Array.from(new Set(filenames.map(it => it.match(regex)[1])));

  // Creates directories.
  episodeNums.forEach((num, i) => {
    const dirPath = path.join(dir, num);
    if (fs.existsSync(dirPath)) return;

    console.log('Create directory: ', dirPath);
    fs.mkdirSync(dirPath);
  });

  // Moves images to each directory.
  filenames.forEach(name => {
    const episodeNum = name.match(regex)[1];

    const oldPath = path.join(dir, name);
    const newPath = path.join(dir, episodeNum, name);

    console.log(`Move '${oldPath}' to '${newPath}'`);
    fs.renameSync(oldPath, newPath);
  });
}
