AWS.config.region = 'us-east-1'; // change to your Lex bot region
AWS.config.credentials = new AWS.Credentials('AKIAXRHJTAQF4DQEIXFM', 'JV6yPJZeJl3QriDPKspCIeOdiIeNM7uoqcjAVZtJ');

function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chat = document.getElementById("chat-box");

    // Show user's message
    chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

    // Create Lex runtime client
    var lexruntime = new AWS.LexRuntimeV2();

    var params = {
        botId: 'AREBG6XU4F',          // find in Lex console
        botAliasId: 'TSTALIASID', // usually 'TSTALIAS'
        localeId: 'en_US',
        sessionId: 'user123',          // any unique ID per user
        text: input
    };

    lexruntime.recognizeText(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            chat.innerHTML += `<p><b>Bot:</b> Sorry, something went wrong.</p>`;
        } else {
            let botReply = data.messages[0].content;
            chat.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
        }
    });

    // Clear input box
    document.getElementById("user-input").value = "";
}

