/**
 1. --port=8080
 2. -p=8080
 3. --debug
 4. -D
 */
const regex = /^(?<prefix>-{1,2})\w+=?/;

module.exports.parseArguments = args => {
    const arguments = args.slice(2)
        .filter(it => regex.test(it))
        .map(it => {
            const matched = it.match(regex);
            return matched.input.replace(matched.groups.prefix, '').split('=')
        })
        .map(arr => ({[arr[0]]: arr[1] || true}));

    return arguments.reduce((acc, cur) => ({...acc, ...cur}), {});
};
