const {parseArguments} = require('./ArgsParser');

const arguments = parseArguments(process.argv);
if ((arguments.type || arguments.t) === 'screenshot') {
    const {screenshot} = require('./lib/Screenshot');
    (async () => await screenshot(arguments.name || arguments.n))();
}
