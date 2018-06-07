# slack-bot

This is a slackbot test.

# How to run this bot locally

## Database installation

You will need to install MongoDB locally before running the bot. [Download Mongo here](https://www.mongodb.com/download-center) or install using `brew install mongodb`.

After installing, start Mongo with the command `mongod --dbpath data/db`

## Running the bot

Run this bot locally by executing the index.js file using node in your terminal.

`node index.js`

If the bot starts successfully you should see the message "SLACK BOT IS RUNNING" in your terminal. You may then message
the bot in Slack using the `@slack-bot` name.

## install Zeppelin to display the analytics
[Download Zeppelin here](http://zeppelin.apache.org/download.html) 

Note: currently this version needs Java 8

## Running Zeppelin
After installing, in your terminal, run the following command to start the UI tool

`${your-folder}/zeppelin-0.7.3-bin-all/bin/zeppelin.sh`

Once it is running, you can access this tool by go to your browser (http://localhost:8080)

load the file called "personaMap.json" from the repo

## About the personMap
For this demo, we use two data files "result.csv" and "Watson.txt" as the input data for analytics.

Once you load the file "personaMap.jason" in Zeppelin, please modify the file path of "result.csv" to match your local repo path, also the same for "Watson.txt"

Then, you can execute and you will see some analytics result
