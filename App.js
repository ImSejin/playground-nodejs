const {parseArguments} = require('./ArgsParser');

const arguments = parseArguments(process.argv);
if ((arguments.type || arguments.t) === 'screenshot') {
    const {screenshot} = require('./lib/Screenshot');
    (async () => await screenshot(arguments.name || arguments.n))();
}
if ((arguments.type || arguments.t) === 'categorization') {
    const {categorize} = require('./lib/Categorization');
    categorize(arguments.path || arguments.p);
}

const calendar = require('./lib/CalendarGenerator');
// (async () => await calendar.generate(550, 340))();
