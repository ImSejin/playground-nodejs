const puppeteer = require('puppeteer');
const dayjs = require('dayjs');
const fs = require('fs');

const timestamp = dayjs().format('YYYY-MM-DD');
const selector = 'div.js-yearly-contributions > div.position-relative';

// Creates a directory if it doesn't exist.
const dir = './screenshots';

exports.screenshot = async username => {
    if (!username || typeof username !== 'string') throw Error(`Username is invalid: ${username}`);

    if (!fs.existsSync(dir)) {
        console.log('Create directory: ', dir);
        fs.mkdirSync(dir);
    }

    const url = `https://github.com/${username.toLowerCase()}`;
    const filename = `${timestamp}_${username}.png`;
    const path = `${dir}/${filename}`;

    // Goes to github profile.
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Captures the selected element.
    await page.waitForSelector(selector, {timeout: 15 * 1000});
    const element = await page.$(selector);
    await element.screenshot({path});
    console.log('Successfully captured Github-Green-Square: ', path);

    // Terminates browser.
    await browser.close();
}
