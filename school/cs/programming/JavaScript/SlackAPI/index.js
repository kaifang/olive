const customerFeedback = require('./data/feedback');
const interviewQuestion = require('./data/Questions');
const mongoose = require('mongoose');
const SlackBot = require('slackbots');

// String constants
const botName = 'Slacker';
const botRealName = 'slack-bot';

// Mongo constants
const Schema = mongoose.Schema;
const AccomplishmentSchema = new Schema({
    record: String,
    date: {type: Date, default: Date.now}
});
const Accomplishment = mongoose.model('Accomplishment', AccomplishmentSchema);

// Regular expressions
const atMessageRegex = new RegExp('@' + botRealName, 'g');
const helpRegex = /help$/gi;
const interviewRegex = /interview$/gi;

// create a bot
const bot = new SlackBot({
    token: 'xoxb-12345678-abcdef', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: botName
});

// start up actions: The bot will post a confirmation message that it is up, connect to MongoDB, and post a confirmation message that the Mongo connection was successful.
bot.on('start', function () {
    console.log(`${botRealName} BOT IS RUNNING`);

    mongoose.connect('mongodb://localhost/my_database');
    console.log('connected to mongo');

});

/**
 * Defines what to do when a message fires.
 */
bot.on('message', function (data) {
    console.log('data=');
    console.log(data);
    if (shouldRespond(data)) {
        const channel = data.channel;
        if (isAskingForHelp(data)) {
            bot.postMessage(channel,
                'What do you need? I can give you customer feedback. Try asking something like' +
                '\n- Do you need anything?' +
                '\n- What can I help you with today?'
            );
        } else if (isInterview(data)) {
            bot.postMessage(channel, 'Interview questions', interviewQuestion.question1);
            bot.postMessage(channel, 'Personal touch questions', interviewQuestion.question2);
        } else if (isAskingForFeedback(data)) {
            bot.postMessage(channel, getCustomerFeedback());
        } else if (shouldSaveRecord(data)) {
            const record = parseMessageToRecord(data);
            if (record) {
                saveRecordToDatabase(record);
            } else {
                bot.postMessage(channel, 'Sorry, I don\'t understand. Try asking me to `record "your accomplishment here"`');
            }
        } else if (shouldGetAccomplishments(data)) {
            postAccomplishments(channel);
        } else if (channel) {
            bot.postMessage(channel, 'I don\'t really know what you want here. Try asking me for help.');
        } else {
            console.log('THIS IS ALL JUST TOO MUCH...');
        }
    }
});

// Retrieves a random feedback string from the stored feedback data.
function getCustomerFeedback() {
    const feedback = customerFeedback.samples;
    // This adds the '>' symbol so that the message will display as a quote in Slack.
    return '>' + feedback[Math.floor(Math.random() * feedback.length)];
}

function isAskingForFeedback(data) {
    const acceptableCommands = [
        'do you need anything',
        'what can I help you with today',
        'what do you need'
    ];
    const content = data.content;

    return doesArrayContainFuzzyString(acceptableCommands, content);
}

function isAskingForHelp(data) {
    const command = data.content.replace(atMessageRegex, '').trim();
    return helpRegex.test(command);
}

function isInterview(data) {
    const command = data.content.replace(atMessageRegex, '').trim();
    return interviewRegex.test(command);
}

function parseMessageToRecord(data) {
    const content = data.content;
    console.log('content=', content);
    // Replace curly quotes with straight quotes to simplify pattern matching.
    const quoteReplacedContent = content.replace(/[\u201C\u201D]/g, '"');
    const start = quoteReplacedContent.indexOf('"') + 1;
    const finish = quoteReplacedContent.lastIndexOf('"');
    return quoteReplacedContent.substring(start, finish);
}

function postAccomplishments(channel) {
    Accomplishment.find({}, function (err, documents) {
        if (err) {
            console.log('ERROR', err);
        } else {
            let accomplishmentPost = 'This is what you\'ve done for me:\n';
            documents.forEach(function (doc, i) {
                const endOfString = i < documents.length - 1 ? '\n' : '';
                accomplishmentPost += doc.record + endOfString;
            }, this);
            bot.postMessage(channel, accomplishmentPost);
        }
    });
}

//Saves a record to MongoDB as an Accomplishment.
function saveRecordToDatabase(record) {
    const myAccomplishment = new Accomplishment();
    myAccomplishment.record = record;

    myAccomplishment.save();
}

function shouldGetAccomplishments(data) {
    const acceptableCommands = [
        'what are our accomplishments'
    ];
    const content = data.content;

    return doesArrayContainFuzzyString(acceptableCommands, content);
}

function shouldSaveRecord(data) {
    const acceptableCommands = [
        'record'
    ];
    const content = data.content;

    return doesArrayContainFuzzyString(acceptableCommands, content);
}

function shouldRespond(data) {
    return data.type === 'desktop_notification' && data.bot_message !== 'bot_message' && data.username !== botName && atMessageRegex.test(data.content);
}

/**
 * Searches an array of strings to determine if any element in that array matches the provided single string. 
 * Uses regular expression matching to make the matches fuzzy.
 * @param {string[]} haystack - An array of strings to search.
 * @param {string} needle - A single string to find in the haystack
 * @param {string} [regexFlags] - Optional string containing regular expression flags. Will use gi flags by default to match globally and ignore case.
 * @returns {boolean}
 */
function doesArrayContainFuzzyString(haystack, needle, regexFlags) {
    return haystack.some(entry => new RegExp(entry, regexFlags || 'gi').test(needle));
}
