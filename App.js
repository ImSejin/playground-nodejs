const {parseArguments} = require('./ArgsParser');

const {t, type, n, name, p, path} = parseArguments(process.argv);

switch (t || type) {
  case 'screenshot':
    const {screenshot} = require('./lib/Screenshot');
    (async () => await screenshot(name || n))();
    break;

  case 'categorization':
    const {categorize} = require('./lib/Categorization');
    categorize(path || p);
    break;

  case 'calendar':
    const calendar = require('./lib/CalendarGenerator');
    (async () => await calendar.generate(550, 340))();
    break;

  case 'webtoon':
    const {rename} = require('./lib/WebtoonRenamer');
    rename(path || p);
    break;

  default:
    break;
}
