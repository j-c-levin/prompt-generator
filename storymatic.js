'use strict';
// Filesystem
let fs = require('fs');
// Readline
let readline = require('readline');
// Arrays
let peopleCards = [];
let thingCards = [];
// Inquirer for prompts
let inquirer = require('inquirer');
// Inquirer prompts
let questions = [
    {
        type: 'list',
        name: 'card',
        message: 'pick a card',
        choices: ['Person', 'Thing']
    }
];
// Gets a random integer within a range, taken from http://stackoverflow.com/a/1527820
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}
// Module functions
module.exports = {
    // Setup readline (this is done first because I need some way of controlling flow)
    readInPeople: () => {
        let readPeople = readline.createInterface({
            input: fs.createReadStream('./peopleCards.txt')
        });
        // Read in peopleCards and add to the array
        readPeople.on('line', (line) => {
            peopleCards.push(line);
        });
        readPeople.on('close', () => {
            console.log('people cards loaded, total:', peopleCards.length);
            // Now load in the things cards
            module.exports.readInThings();
        });
    },
    readInThings: () => {
        let readThings = readline.createInterface({
            input: fs.createReadStream('./thingCards.txt')
        });
        // Read in thingCards and add to the array
        readThings.on('line', (line) => {
            thingCards.push(line);
        });
        readThings.on('close', () => {
            console.log('thing cards loaded, total:', peopleCards.length);
            // Launch the questions now that cards have been read in
            module.exports.askQuestion();
        });
    },
    getPerson: () => {
        return peopleCards[getRandomInt(0, peopleCards.length - 1)];
    },
    getThing: () => {
        return thingCards[getRandomInt(0, thingCards.length - 1)];
    },
    askQuestion: () => {
        inquirer.prompt(questions).then((answers) => {
            let response = (answers.card === 'Person') ? module.exports.getPerson() : module.exports.getThing();
            console.log(`${answers.card} card: ${response}`);
            module.exports.askQuestion();
        });
    }
};
module.exports.readInPeople();