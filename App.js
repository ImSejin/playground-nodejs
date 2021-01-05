const {screenshot} = require('./lib/Screenshot');
const {parseArguments} = require('./ArgsParser');

const arguments = parseArguments(process.argv);
if ((arguments.type || arguments.t) === 'screenshot') {
    (async () => await screenshot(arguments.name || arguments.n))();
}
