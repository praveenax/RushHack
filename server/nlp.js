const dialogflow = require('dialogflow');
const uuid = require('uuid');


function testFunc(){
    console.log("test func");
}
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(inputText) {
    
    var projectId = 'gjden-ac410'
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: inputText,
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }
    
    return result.fulfillmentText
}


try {
//    runSample();
} catch (e) {
    console.log(e);
}

class nlp{
    test(){
      testFunc();  
    } 
    
    run(inputText){
        return runSample(inputText)
    }
}

module.exports = nlp;