const interviewQuestion = {
    "attachments": [
        {
            "text": "Would you say you're a good student?",
            "fallback": "Shame... buttons aren't supported in this land",
            "callback_id": "button_tutorial",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "Excellent",
                    "text": "Yep, I'm excellent",
                    "type": "button",
                    "value": "Excellent"
                },
                {
                    "name": "Good",
                    "text": "Yep, I'm good",
                    "type": "button",
                    "value": "Good"
                },
                {
                    "name": "OK",
                    "text": "I'm OK",
                    "type": "button",
                    "value": "OK"
                },
                {
                    "name": "No",
                    "text": "Not really",
                    "type": "button",
                    "value": "No",
                    "style": "danger"
                }
            ]
        }
    ]
};

const interviewQuestion2 = 
{
    "response_type": "in_channel",
    "attachments": [
        {
            "text": "what kind of food you’re looking for today:",
            "fallback": "If you could read this message, you'd be choosing something fun.",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "callback_id": "game_selection",
            "actions": [
                {
                    "name": "games_list",
                    "text": "Pick one...",
                    "type": "select",
                    "options": [
                        {
                            "text": "Food for myself",
                            "value": "Myself"
                        },
                        {
                            "text": "For my family",
                            "value": "Family"
                        },
                        {
                            "text": "For my pet",
                            "value": "Pet"
                        },
                        {
                            "text": "All of the above",
                            "value": "All"
                        },
                        {
                            "text": "Something else",
                            "value": "Other"
                        },
                        {
                            "text": "Won't tell",
                            "value": "NA"
                        }
                    ]
                }
            ]
        }
    ]
};

module.exports.question1 = interviewQuestion;
module.exports.question2 = interviewQuestion2;
