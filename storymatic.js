// Filesystem
let fs = require('fs');
// Readline
let readline = require('readline');
// Arrays
let peopleCards = [];
let thingCards = [];
// Setup readline
let readPeople = readline.createInterface({
    input: fs.createReadStream('./peopleCards.txt')
});
let readThings = readline.createInterface({
    input: fs.createReadStream('./thingCards.txt')
});
// Taken from http://stackoverflow.com/a/1527820
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}
// Module functions
module.exports = {
    getPerson: () => {
        return peopleCards[getRandomInt(0, peopleCards.length - 1)];
    },
    getThing: () => {
        return thingCards[getRandomInt(0, thingCards.length - 1)];
    }
}
// Read in peopleCards;
readPeople.on('line', (line) => {
    peopleCards.push(line);
});
readPeople.on('close', () => {
    console.log('random card from list of',peopleCards.length,'is:', module.exports.getPerson());
});
// Read in thingCards;
readThings.on('line', (line) => {
    thingCards.push(line);
});
readThings.on('close', () => {
    console.log('random card from list of',peopleCards.length,'is:', module.exports.getThing());
});