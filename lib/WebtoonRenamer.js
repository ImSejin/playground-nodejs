const fs = require('fs');
const path = require('path');

const PLATFORM_NAVER = 'navertoon';
const PLATFORM_DAUM = 'daumtoon';
const regex = new RegExp(`\\[(?<authors>.+)] (?<name>.+) \\((?<platform>${PLATFORM_NAVER}|${PLATFORM_DAUM})_\\w+\\)`);
const authorsDelim = ' ／ ';

exports.rename = dir => {
  const filenames = fs.readdirSync(dir);
  filenames.forEach(filename => {
    const result = regex.exec(filename);
    if (!result) return;

    const platform = result.groups.platform;
    const name = result.groups.name;
    const authors = result.groups.authors.replace(authorsDelim, ', ');
    const dirName = `${platform.charAt(0).toUpperCase()}_${name} - ${authors} [完]`;

    const oldPath = path.join(dir, filename);
    const newPath = path.join(dir, dirName);
    fs.rename(oldPath, newPath, () => console.log(`Successfully renamed: ${dirName}`));
  });
};
